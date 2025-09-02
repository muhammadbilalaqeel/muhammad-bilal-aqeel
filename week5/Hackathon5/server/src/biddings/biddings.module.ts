import { Module } from '@nestjs/common';
import { BiddingsController } from './biddings.controller';
import { BiddingsService } from './biddings.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AuctionModule } from 'src/auction/auction.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid, BidSchema } from './schema/bid.schema';

@Module({
  imports : [
    AuthModule,UserModule, JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
          }),
          MongooseModule.forFeature([{name:Bid.name,schema:BidSchema}]),
          AuctionModule
  ],
  controllers: [BiddingsController],
  providers: [BiddingsService]
})
export class BiddingsModule {}
