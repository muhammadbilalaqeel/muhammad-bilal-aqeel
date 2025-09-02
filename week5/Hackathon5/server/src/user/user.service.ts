import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { createUserdto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel : Model<UserDocument>){}

    async getUserById(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid user ID',
        data: null,
      });
    }

    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
        data: null,
      });
    }

    return {
      statusCode: 200,
      message: 'User fetched successfully',
      data: user,
    };
  }

  async createUser(dto : createUserdto) {
    try {
      const user = await this.UserModel.create(dto);
      const {username,fullName,email,roles} = user
      const data = {username,fullName,email,roles}
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: data,
      };
    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Email already exists',
          data: null,
        });
      }

     
      throw new BadRequestException({
        statusCode: 400,
        message: error.message || 'Failed to create user',
        data: null,
      });
    }
  }

  async getProfile(userId: string) {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException({
      statusCode: 400,
      message: 'Invalid user ID',
      data: null,
    });
  }

  const user = await this.UserModel.findById(userId).populate('myCars').populate('bids').populate('wishlist').lean();
  if (!user) {
    throw new NotFoundException({
      statusCode: 404,
      message: 'User not found',
      data: null,
    });
  }



  return {
    statusCode: 200,
    message: 'Profile fetched successfully',
    data: user,
  };
}

async updateUser(userId: string, dto: UpdateUserDto): Promise<{ statusCode: number; message: string; data?: User }> {
    try {
      const user = await this.UserModel.findById(userId);
      if (!user) {
        return {
          statusCode: 404,
          message: 'User not found',
        };
      }

      // Merge top-level fields
      if (dto.fullName !== undefined) user.fullName = dto.fullName;
      if (dto.email !== undefined) user.email = dto.email;
      if (dto.mobileNumber !== undefined) user.mobileNumber = dto.mobileNumber;
      if (dto.nationality !== undefined) user.nationality = dto.nationality;
      if (dto.idType !== undefined) user.idType = dto.idType;

      // Merge address
      if (dto.address) {
        user.address = { ...user.address, ...dto.address };
      }

      // Merge trafficFile
      if (dto.trafficFile) {
        user.trafficFile = { ...user.trafficFile, ...dto.trafficFile };
      }

      const updatedUser = await user.save();

      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }

}
