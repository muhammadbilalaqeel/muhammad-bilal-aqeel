import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReplyDto } from 'src/dtos/create-reply.dto';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { Review, ReviewDocument } from 'src/schemas/review.schema';

@Injectable()
export class ReplyService {
    constructor(@InjectModel(Reply.name) private replyModel : Model<ReplyDocument>,
@InjectModel(Review.name) private reviewModel : Model<ReviewDocument>
){}

  async createReply(dto: CreateReplyDto, userId: string) {
  try {
    const { reviewId, reply } = dto;

    if (!Types.ObjectId.isValid(reviewId)) {
      throw new BadRequestException('Invalid review ID');
    }
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const review = await this.reviewModel.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }


    const newReply = await this.replyModel.create({
      userId,
      reviewId,
      reply,
    });

   review.reply.push(newReply._id as Types.ObjectId);
await review.save();

   
    return this.replyModel
      .findById(newReply._id)
      .populate('userId', 'name email');
  } catch (error) {
    this.handleMongooseError(error, 'Failed to create reply');
  }
}




      private handleMongooseError(error: any, fallbackMessage: string): never {
        if (error.name === 'CastError') {
          throw new BadRequestException('Invalid ID format');
        }
        if (error.code === 11000) {
          throw new BadRequestException('Duplicate entry not allowed');
        }
        throw new InternalServerErrorException(fallbackMessage);
      }
}
