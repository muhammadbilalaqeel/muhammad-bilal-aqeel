import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class createUserdto{

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    fullName : string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(15)
    mobileNumber:string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username :string


    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string
}




export class LoginDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
