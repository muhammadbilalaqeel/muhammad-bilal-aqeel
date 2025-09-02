import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { createCommentDto } from './dto/create-comment.dto';
import { PostDocument } from 'src/post/post.schema';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { Post } from 'src/post/post.schema';
import { AuthService } from 'src/auth/auth.service';
import { User, userDocument } from 'src/auth/auth.schema';
const createDOMPurify = require('dompurify');
import { JSDOM } from 'jsdom';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel : Model<CommentDocument>,

 @InjectModel(Post.name) private postModel: Model<PostDocument>, 
    private notificationService: NotificationService,               
    private notificationGateway: NotificationGateway ,
     private userService:AuthService
){}

  // Create a comment or reply
  async createComment(userId: string, dto: createCommentDto) {
    let { comment, postId, parentComment } = dto;
  
const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const cleanContent = DOMPurify.sanitize(comment, {
      ALLOWED_TAGS: ['b','i','u','strong','em','p','br','ul','ol','li','a','h1','h2','h3'],
      ALLOWED_ATTR: ['href','target','rel'],
    });

    if (parentComment) {
      const parent = await this.commentModel.findById(parentComment);
      if (!parent) throw new NotFoundException('Parent comment not found');
      postId = parent.postId.toString();
    }


    const newComment = new this.commentModel({
      comment:cleanContent,
      postId,
      author: userId,
      parentComment: parentComment || null,
      likes: [],
    });

    try {
      const savedComment: CommentDocument = await newComment.save();
const commentId = (savedComment._id as Types.ObjectId).toString();
      if (parentComment) {
        const parent = await this.commentModel.findById(parentComment);
        if (parent && parent.author.toString() !== userId) {
          const notif = await this.notificationService.createNotification(
            parent.author.toString(),
            commentId,
            `Someone replied to your comment`,
          );
          this.notificationGateway.sendNotification(parent.author.toString(), notif);
        }
      } else {
        const post = await this.postModel.findById(postId);
        if (post && post.author.toString() !== userId) {
          const notif = await this.notificationService.createNotification(
            post.author.toString(),
            commentId,
            `Someone commented on your post`,
          );
          this.notificationGateway.sendNotification(post.author.toString(), notif);
        }
      }

      this.notificationGateway.server.emit('newComment', savedComment);

      return savedComment;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(
          Object.values(error.errors).map((e: any) => e.message),
        );
      }
      throw error;
    }
  }

  async getAllComments(postId: string) {
  type CommentWithReplies = Comment & { replies: CommentWithReplies[] };

  const comments = await this.commentModel.find({ postId }).populate('author','username').populate('likes','username').lean().exec();

  const map = new Map<string, CommentWithReplies>(
    comments.map(c => [c._id.toString(), { ...c, replies: [] }])
  );

  const tree: CommentWithReplies[] = [];

  for (const c of map.values()) {
    if (c.parentComment) {
      const parent = map.get(c.parentComment.toString());
      if (parent) parent.replies.push(c);
    } else {
      tree.push(c);
    }
  }

  return tree;
}

async toggleLike(userId: string, commentId: string) {
  const comment = await this.commentModel
    .findById(commentId)
    .populate('author', 'username');

  if (!comment) throw new NotFoundException('Comment not found');
  const currentUser = await this.userService.getUserById(userId)
  const commentAuthorId = (comment.author as any)._id.toString();
  const commentAuthor = await this.userService.getUserById(commentAuthorId);
  console.log(commentAuthor)
  const userIdStr = userId.toString();

  if (comment.likes.map(l => l.toString()).includes(userIdStr)) {
    comment.likes = comment.likes.filter(l => l.toString() !== userIdStr);
    if(commentAuthorId===userId){

        this.notificationGateway.notifyUser(commentAuthorId,`You unliked your comment ${comment.comment}`)
      }
      else{
        this.notificationGateway.notifyUser(commentAuthorId,`${currentUser.username} unliked your comment ${comment.comment}`)
      }
    // this.notificationGateway.notifyUser(commentAuthorId,`${currentUser.username} unliked your comment ${comment.comment}`)
  } else {
    comment.likes.push(userIdStr as any);
     if(commentAuthorId===userId){

        this.notificationGateway.notifyUser(commentAuthorId,`You liked your comment ${comment.comment}`)
      }
      else{
        this.notificationGateway.notifyUser(commentAuthorId,`${currentUser.username} liked your comment ${comment.comment}`)
      }
    //  this.notificationGateway.notifyUser(commentAuthorId,`${currentUser.username} liked your comment ${comment.comment}`)
  }

  return await comment.save();
}
}





