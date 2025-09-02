import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Car, CarSchema } from './schemas/car.schema';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[    UserModule, 
      MongooseModule.forFeature([{name:Car.name,schema:CarSchema}]), 
      AuthModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),],
  providers: [AuctionService],
  controllers: [AuctionController],
  exports:[MongooseModule.forFeature([{name:Car.name,schema:CarSchema}]),AuctionService]
})
export class AuctionModule {}
