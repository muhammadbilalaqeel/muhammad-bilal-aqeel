import { IsMongoId, IsNotEmpty, MaxLength, MinLength } from "class-validator"



export class CreateReviewDto{

    @IsNotEmpty()
    @IsMongoId()
    prodId : string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(150)
    review : string
}