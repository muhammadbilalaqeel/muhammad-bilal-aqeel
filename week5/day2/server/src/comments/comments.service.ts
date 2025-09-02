import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto, authorId: string): Promise<Comment> {
    const comment = new this.commentModel({
      ...createCommentDto,
      author: authorId,
      parentComment: createCommentDto.parentComment || null,
    });

    const savedComment = await comment.save();

    // If it's a reply, add it to parent's replies array
    if (createCommentDto.parentComment) {
      await this.commentModel.findByIdAndUpdate(
        createCommentDto.parentComment,
        { $push: { replies: savedComment._id } },
      );
    }

    return savedComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel
      .find({ parentComment: null })
      .populate('author', 'username profilePicture')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'username profilePicture',
        },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentModel
      .findById(id)
      .populate('author', 'username profilePicture')
      .exec();
    
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    
    return comment;
  }

  async updateLikeCount(commentId: string, increment: number): Promise<void> {
    await this.commentModel
      .findByIdAndUpdate(commentId, { $inc: { likesCount: increment } })
      .exec();
  }

  async delete(id: string, userId: string): Promise<void> {
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    await this.commentModel.findByIdAndDelete(id);
  }
}