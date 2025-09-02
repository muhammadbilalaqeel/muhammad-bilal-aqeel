import { IsMongoId } from 'class-validator';

export class ToggleLikeDto {
  @IsMongoId()
  reviewId: string;
}