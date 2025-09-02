import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  profilePicture?: string;
}

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  profilePicture?: string;
}