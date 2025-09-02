import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User, userDocument } from './auth.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<userDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // Register user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });

    try {
      return await newUser.save();
    } catch (error: any) {
      // Handle duplicate key errors
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        throw new BadRequestException(
          `The ${duplicateField} "${error.keyValue[duplicateField]}" is already taken`,
        );
      }
      throw error; // rethrow other errors
    }
  }

  // Login user
  async login(loginDto: LoginUserDto): Promise<{ access_token: string,user : User }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('No account found with this email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token,user:user };
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).populate("followers", "username email profilePicture") 
  .populate("following", "username email profilePicture").exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    return user;
  }

  async findByUsername(username: string) {
  const user = await this.userModel.findOne({ username })
    .select('-password')
    .populate('followers', 'username email')
    .populate('following', 'username email')
    .exec();

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return { success: true, data: user };
}
 
async toggleFollow(userId: string, targetId: string) {
    if (userId === targetId) {
      throw new BadRequestException("You cannot follow yourself");
    }

    const user = await this.userModel.findById(userId);
    const targetUser = await this.userModel.findById(targetId);

    if (!user || !targetUser) {
      throw new NotFoundException("User not found");
    }

    // Cast IDs to ObjectId explicitly
    const userObjId = new Types.ObjectId(user._id as string);
    const targetObjId = new Types.ObjectId(targetUser._id as string);

    const isFollowing = targetUser.followers.some(followerId =>
      followerId.equals(userObjId),
    );

    if (isFollowing) {
      // Unfollow
      targetUser.followers = targetUser.followers.filter(
        id => !id.equals(userObjId),
      );
      user.following = user.following.filter(
        id => !id.equals(targetObjId),
      );
    } else {
      // Follow
      targetUser.followers.push(userObjId);
      user.following.push(targetObjId);
    }

    await targetUser.save();
    await user.save();

    return {
      success: true,
      message: isFollowing
        ? `You have unfollowed ${targetUser.username}`
        : `You are now following ${targetUser.username}`,
    };
  }}