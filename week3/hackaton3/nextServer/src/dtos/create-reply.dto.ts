import { IsNotEmpty } from "class-validator";



export class CreateReplyDto{
    @IsNotEmpty()
     reply: string;

     @IsNotEmpty()
     reviewId: string; 
}