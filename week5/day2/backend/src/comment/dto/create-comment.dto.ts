import { IsMongoId, IsNotEmpty, IsOptional, MaxLength, MinLength, ValidateIf } from "class-validator";

export class createCommentDto {
  @ValidateIf(o => !o.parentComment) // only required if parentComment is missing
  @IsMongoId()
  @IsNotEmpty()
  postId?: string;   // ✅ optional now

  @IsNotEmpty()
  @MaxLength(150)
  @MinLength(2)
  comment: string;

  @IsOptional()
  @IsMongoId()
  parentComment?: string;
}
