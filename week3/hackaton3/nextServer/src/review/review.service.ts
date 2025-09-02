import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from 'src/dtos/create-review.dto';
import { Review, ReviewDocument } from 'src/schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  /**
   * Create a new review
   */
  async createReview(createReviewDto: CreateReviewDto, userId: string) {
    try {
      const { prodId, review } = createReviewDto;

      if (!prodId || !review) {
        throw new BadRequestException('Product ID and review text are required');
      }

      const newReview = new this.reviewModel({
        prodId: new Types.ObjectId(prodId),
        userId: new Types.ObjectId(userId),
        review,
      });

      return await newReview.save();
    } catch (error) {
      this.handleMongooseError(error, 'Failed to create review');
    }
  }

  /**
   * Like/Unlike a review
   */
 async toggleLike(reviewId: string, userId: string) {
  if (!Types.ObjectId.isValid(reviewId)) {
    throw new BadRequestException('Invalid review ID');
  }
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException('Invalid user ID');
  }

  const review = await this.reviewModel.findById(reviewId);
  if (!review) throw new NotFoundException('Review not found');

  const userObjectId = new Types.ObjectId(userId);
  const alreadyLiked = review.likes.some(
    (id) => id.toString() === userObjectId.toString(),
  );

  return await this.reviewModel.findByIdAndUpdate(
    reviewId,
    alreadyLiked
      ? { $pull: { likes: userObjectId } }
      : { $addToSet: { likes: userObjectId } },
    { new: true },
  );
}

//Get All Reviews

async getAllReviews(){
    try {
         const reviews = await this.reviewModel.find().populate('userId').populate('likes') // populate likes
  .populate({
    path: 'reply',
    populate: [
      { path: 'userId', model: 'User' }, 
      { path: 'reviewId', model: 'Review' } 
    ]
  })
  .exec();
;
         return {
        status: 200,
        message: 'Review retrieved successfully',
        data: reviews,
      };
    } catch (error) {
        this.handleMongooseError(error, 'Failed to fetch review');
    }
}

  /**
   * Get a review by ID
   */
  async getReviewByID(reviewId: string) {
    try {
      const review = await this.reviewModel.findById(reviewId).populate('likes','name email').populate('reply').exec();

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      return {
        status: 200,
        message: 'Review retrieved successfully',
        data: review,
      };
    } catch (error) {
      this.handleMongooseError(error, 'Failed to fetch review');
    }
  }

  /**
   * Centralized Mongoose error handler
   */
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
