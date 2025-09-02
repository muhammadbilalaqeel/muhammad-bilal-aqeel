import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WishlistItem, WishlistItemDocument } from './schema/wishlist.schema';
import { Model } from 'mongoose';

@Injectable()
export class WishlistService {
    constructor(@InjectModel(WishlistItem.name) private wishlistModel : Model<WishlistItemDocument>){}


    async createWishlist(userId:string,carId:string){
      const wishlist = await new this.wishlistModel({
        user : userId,
        car : carId
      })

      return {
        statusCode: HttpStatus.OK,
              message: 'Wishlist Created successfully',
              data: wishlist,
      }
    }


    async getWishlistByUser(userId:string){
        const wishlist = await this.wishlistModel.find({user : userId}).populate('car').exec();
        return {
        statusCode: HttpStatus.OK,
              message: 'Wishlist fetched successfully',
              data: wishlist,
      }
    }
}
