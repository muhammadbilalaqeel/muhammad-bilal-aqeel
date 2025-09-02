import { IsNotEmpty, IsMongoId, IsNumber, Min } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsMongoId()
  car: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
