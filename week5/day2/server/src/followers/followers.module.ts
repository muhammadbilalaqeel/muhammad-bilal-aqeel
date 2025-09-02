import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { Follower, FollowerSchema } from './schemas/follower.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follower.name, schema: FollowerSchema }]),
    UsersModule,
  ],
  controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService],
})
export class FollowersModule {}