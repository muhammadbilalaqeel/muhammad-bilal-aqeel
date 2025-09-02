import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService:WishlistService){}

    // @UseGuards(AuthGuard)
    @Post()
    async create(@Body() carId:string,@Request() req){
        const {userId} = req.user;
        return this.wishlistService.createWishlist(userId,carId)
    }
     @Get('user')
      async getListByUser(@Request() req){
        const {userId} = req.user
        return this.wishlistService.getWishlistByUser(userId)
      }
    
}
