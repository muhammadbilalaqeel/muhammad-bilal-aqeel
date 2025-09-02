import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './schemas/like.schema';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    private commentsService: CommentsService,
  ) {}

  async toggleLike(userId: string, commentId: string): Promise<{ liked: boolean }> {
    const existingLike = await this.likeModel.findOne({
      user: userId,
      comment: commentId,
    });

    if (existingLike) {
      // Unlike
      await this.likeModel.deleteOne({ _id: existingLike._id });
      await this.commentsService.updateLikeCount(commentId, -1);
      return { liked: false };
    } else {
      // Like
      await this.likeModel.create({
        user: userId,
        comment: commentId,
      });
      await this.commentsService.updateLikeCount(commentId, 1);
      return { liked: true };
    }
  }

  async getUserLikes(userId: string): Promise<string[]> {
    const likes = await this.likeModel.find({ user: userId }).select('comment');
    return likes.map(like => like.comment.toString());
  }
}