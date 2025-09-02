import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Review.name,schema:ReviewSchema}, { name: Review.name, schema: ReviewSchema }])
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports:[ReviewService,MongooseModule]
})
export class ReviewModule {}
