import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { Model, Types } from 'mongoose';
import { SellingCarDto } from './dtos/selling_car.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createCarAuction(dto: SellingCarDto, userId: string) {
    // Validate user id
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid user ID',
        data: null,
      });
    }

    // Check user exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
        data: null,
      });
    }

    // Create car document
    const car = new this.carModel({
      ...dto,
      owner: userId,
    });

    try {
      await car.save();

      // Push reference to user’s "myCars"
      await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { myCars: car._id } },
        { new: true },
      );

      return {
        statusCode: 201,
        message: 'Car auction created successfully',
        data: car,
      };
    } catch (error) {
      // Handle duplicate VIN
      if (error.code === 11000 && error.keyPattern?.vin) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'A car with this VIN already exists',
          data: { vin: error.keyValue.vin },
        });
      }

      // rethrow other errors
      throw new BadRequestException({
        statusCode: 400,
        message: 'Failed to create car auction',
        data: error.message,
      });
    }
  }

async getAllAuctions(status?: 'draft' | 'live' | 'ended' | 'sold') {
  try {

    const cars = await this.carModel.find().exec();

    if (!cars || cars.length === 0) {
      return {
        statusCode: 404,
        message: 'No auctions found',
        data: [],
      };
    }

    let filteredCars = cars;

    if (status) {
      // Use virtual property to filter
      filteredCars = cars.filter((car) => car.status === status);

      if (filteredCars.length === 0) {
        return {
          statusCode: 404,
          message: `No auctions found with status: ${status}`,
          data: [],
        };
      }
    }

    return {
      statusCode: 200,
      message: 'Auctions fetched successfully',
      data: filteredCars,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message || 'Failed to fetch auctions',
      data: [],
    };
  }
}


  async getAuctionById(id: string) {
    try {
      // Validate ObjectId
      if (!Types.ObjectId.isValid(id)) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid auction ID format',
          data: null,
        };
      }

      
      const auction = await this.carModel
        .findById(id)
        .populate('currentLeader') 
        .exec();

      if (!auction) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Auction not found',
          data: null,
        };
      }

      
      const auctionData = auction.toJSON({ virtuals: true });

      return {
        statusCode: HttpStatus.OK,
        message: 'Auction fetched successfully',
        data: auctionData,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to fetch auction',
        data: null,
      };
    }
  }



async endAuction(id: string, userId: string) {
  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      message: 'Invalid auction ID or user ID',
      data: null,
    };
  }

  // Find auction
  const auction = await this.carModel.findById(id);
  if (!auction) {
    return {
      statusCode: 404,
      message: 'Auction not found',
      data: null,
    };
  }

  // Check ownership
  if (auction.owner.toString() !== userId) {
    return {
      statusCode: 403,
      message: 'Not authorized to end this auction',
      data: null,
    };
  }

  // Mark as sold
  auction.sold = true;
  await auction.save();

  return {
    statusCode: 200,
    message: 'Auction ended and marked as sold',
    data: auction,
  };
}

}
