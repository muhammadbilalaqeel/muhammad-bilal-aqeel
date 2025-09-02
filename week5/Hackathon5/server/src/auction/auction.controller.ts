import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { SellingCarDto } from './dtos/selling_car.dto';
import { AuctionService } from './auction.service';

@Controller('auction')
export class AuctionController {
    constructor(private readonly auctionService : AuctionService){}

    @UseGuards(AuthGuard)
    @Post()
    async createAuction(@Body() dto:SellingCarDto,@Request() req){
        const {userId} = req.user
        return this.auctionService.createCarAuction(dto,userId)
    }
    @Get()
        async getAllAuctions(@Query('status') status?: 'draft' | 'live' | 'ended' | 'sold') {
        return this.auctionService.getAllAuctions(status);
    }

    @Get(':id')
    async getAuctionById(@Param() param){
        const {id} = param;
        return this.auctionService.getAuctionById(id)
    }


    @UseGuards(AuthGuard)
      @Patch(':id/end')
      async endAuction(@Param('id') id: string,@Request() req) {
        const {userId} = req.user
        return this.auctionService.endAuction(id,userId);
      }


}
