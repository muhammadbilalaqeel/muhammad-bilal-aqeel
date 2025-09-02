import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBidDto } from './dtos/create-bid.dto';
import { BiddingsService } from './biddings.service';

@Controller('biddings')
export class BiddingsController {

    constructor(private readonly bidService: BiddingsService){}

     @UseGuards(AuthGuard)
  @Post()
  async placeBid(@Body() createBidDto: CreateBidDto, @Request() req) {
    const {userId} = req.user; 
    return this.bidService.placeBid(createBidDto, userId);
  }

  // Get bids for a car
  @Get('car/:carId')
  async getBidsByCar(@Param('carId') carId: string) {
    return this.bidService.getBidsByCar(carId);
  }


  @UseGuards(AuthGuard)
  @Get('user')
  async getBidsByUser(@Request() req){
    const {userId} = req.user
    return this.bidService.getBidsByUser(userId)
  }
}
