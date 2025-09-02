import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schema/user.schema'
import { UserService } from 'src/user/user.service';
import { createUserdto, LoginDto } from 'src/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private userService : UserService) {}

  // -----------------------
  // REGISTER
  // -----------------------
  async register(dto : createUserdto) {
    const {email,password,username} = dto
    // Check if email already exists
    const emailExists = await this.userModel.findOne({ email });
    if (emailExists) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Email already exists',
        data: null,
      });
    }

    // Check if username already exists
    const usernameExists = await this.userModel.findOne({ username });
    if (usernameExists) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Username already exists',
        data: null,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    dto.password = hashedPassword
    // Create user
    const user = await this.userService.createUser(dto) 
    return user
  }

  // -----------------------
  // LOGIN
  // -----------------------
  async login(dto : LoginDto) {
    const {email,password} = dto
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid credentials',
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid credentials',
        data: null,
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );

    return {
      statusCode: 200,
      message: 'Login successful',
      data: { token: token ,user },
    };
  }
}
