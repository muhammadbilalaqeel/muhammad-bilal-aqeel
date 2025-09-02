import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateReviewDto } from 'src/dtos/create-review.dto';
import { ToggleLikeDto } from 'src/dtos/toggle-like.dto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewServices : ReviewService){}

    @UseGuards(AuthGuard)
    @Post()
    async createReview(@Body() dto : CreateReviewDto , @Request() req){
       const userId = req.user.id
       return this.reviewServices.createReview(dto,userId)
    }
@UseGuards(AuthGuard)
@Put('toggle-like')
async toggleLike(
  @Body() body: ToggleLikeDto,
  @Request() req
) {
    // console.log(req)
  const  userId  = req.user.id;
  return this.reviewServices.toggleLike(body.reviewId, userId);
}

@Get()
async getAllReviews(){
    return this.reviewServices.getAllReviews()
}
}
