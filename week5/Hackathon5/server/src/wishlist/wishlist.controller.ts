import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService:WishlistService){}

   @Post()
@UseGuards(AuthGuard)
async create(@Body() body: { car: string }, @Request() req) {
    const { userId } = req.user;
    const { car } = body; 
    return this.wishlistService.createWishlist(userId, car);
}


    @UseGuards(AuthGuard)
     @Get('user')
      async getListByUser(@Request() req){
        const {userId} = req.user
        return this.wishlistService.getWishlistByUser(userId)
      }
    
}
