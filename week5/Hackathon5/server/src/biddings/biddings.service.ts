import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bid, BidDocument } from './schema/bid.schema';
import { Model, Types } from 'mongoose';
import { CreateBidDto } from './dtos/create-bid.dto';
import { Car, CarDocument } from 'src/auction/schemas/car.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class BiddingsService {

    constructor(@InjectModel(Bid.name) private bidModel : Model<BidDocument>,
    @InjectModel(Car.name) private carModel : Model<CarDocument>,
    @InjectModel(User.name) private userModel : Model<UserDocument>
){}


 async placeBid(createBidDto: CreateBidDto, userId: string) {
  const { car: carId, amount } = createBidDto;

  if (!Types.ObjectId.isValid(carId) || !Types.ObjectId.isValid(userId)) {
    throw new HttpException(
      { statusCode: 400, message: 'Invalid ID', data: null },
      HttpStatus.BAD_REQUEST,
    );
  }

  const car = await this.carModel.findById(carId);
  if (!car) {
    throw new HttpException(
      { statusCode: 404, message: 'Car not found', data: null },
      HttpStatus.NOT_FOUND,
    );
  }

  const now = new Date();
  if (now < car.startsAt || now > car.endsAt || car.sold) {
    throw new HttpException(
      { statusCode: 400, message: 'Auction is not live', data: null },
      HttpStatus.BAD_REQUEST,
    );
  }

  if (car.currentBidAmount && amount <= car.currentBidAmount) {
    throw new HttpException(
      { statusCode: 400, message: `Bid must be higher than current bid (${car.currentBidAmount})`, data: null },
      HttpStatus.BAD_REQUEST,
    );
  }

  const bid = await this.bidModel.create({ car: carId, user: userId, amount });

  car.currentBidAmount = amount;
  car.currentLeader = new Types.ObjectId(userId);
  car.totalBids += 1;
  await car.save();

  const updatedUser = await this.userModel.findByIdAndUpdate(
    userId,
    { $push: { bids: bid._id } },
    { new: true }
  );

  if (!updatedUser) {
    throw new HttpException(
      { statusCode: 404, message: 'User not found', data: null },
      HttpStatus.NOT_FOUND,
    );
  }

  return {
    statusCode: HttpStatus.CREATED,
    message: 'Bid placed successfully',
    data: bid,
  };
}




  // Get all bids for a car (optional)
  async getBidsByCar(carId: string) {
    const bids = await this.bidModel
      .find({ car: carId })
      .sort({ amount: -1, createdAt: -1 })
      .populate('user')
      .lean();

    return {
      statusCode: HttpStatus.OK,
      message: 'Bids fetched successfully',
      data: bids,
    };
  }


  async getBidsByUser(userId:string){
    const bids = await this.bidModel.find({user:userId}).populate('car');

     return {
      statusCode: HttpStatus.OK,
      message: 'Bids fetched successfully',
      data: bids,
    };
  }
}
