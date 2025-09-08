import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WishlistItem, WishlistItemDocument } from './schema/wishlist.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class WishlistService {
    constructor(@InjectModel(WishlistItem.name) private wishlistModel : Model<WishlistItemDocument>){}


  async createWishlist(userId: string, carId: string) {
  const wishlist = await new this.wishlistModel({
    user: userId,
    car: carId,
  }).save();

  return {
    statusCode: HttpStatus.OK,
    message: 'Wishlist created successfully',
    data: wishlist,
  };
}



async getWishlistByUser(userId: string) {
  // Fetch wishlist items for this user and populate car data
  const wishlistItems = await this.wishlistModel
    .find({ user: userId })
    .populate('car') // populate car details
    .exec();

  // Convert into a single object with array of cars
  const cars = wishlistItems.map(item => item.car);

  return {
    statusCode: 200,
    message: 'Wishlist fetched successfully',
    data: { user: userId, cars },
  };
}

}
