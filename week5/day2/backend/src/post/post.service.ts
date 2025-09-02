import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel:Model<PostDocument> , private notificationGateway:NotificationGateway , private userService:AuthService ){}


    async CreatePost(createpostdto:CreatePostDto,userId:string){
       const newPost = new this.postModel({
        ...createpostdto,
        author:userId
       })

       return newPost.save()
    }

   async findAll(): Promise<{ success: boolean; data: Post[]; message?: string }> {
  const posts = await this.postModel.find().populate('author', 'username email').exec();
  if (!posts || posts.length === 0) {
    return { success: true, data: [], message: 'No posts found' };
  }
  return { success: true, data: posts };
}

async toggleLike(postId: string, userId: string): Promise<Post> {
    const post = await this.postModel.findById(postId).populate('author','username');
    const postUser = await this.userService.getUserById(userId)
    // console.log(object)
    console.log(postUser)
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    console.log(post)
    const alreadyLiked = post.likes.some(
      (likeUserId) => likeUserId.toString() === userId,
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (likeUserId) => likeUserId.toString() !== userId,
      );
      if(post.author._id.toString()===userId){

        this.notificationGateway.notifyUser(post.author._id.toString(),`You unliked your post ${post.title}`,userId)
      }
      else{
        this.notificationGateway.notifyUser(post.author._id.toString(),`${postUser.username} unliked your post ${post.title}`,userId)
      }
      
    } else {
      post.likes.push(userId as any);
      // this.notificationGateway.notifyUser(post.author._id.toString(),`${postUser.username} liked your post ${post.title}`)
       if(post.author._id.toString()===userId){

        this.notificationGateway.notifyUser(post.author._id.toString(),`You liked your post ${post.title}`,userId)
      }
      else{
        this.notificationGateway.notifyUser(post.author._id.toString(),`${postUser.username} liked your post ${post.title}`,userId)
      }
    }

    return await post.save();
  }

}
