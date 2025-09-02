import { IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class CreatePostDto{
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    title:string

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(150)
    content:string
}