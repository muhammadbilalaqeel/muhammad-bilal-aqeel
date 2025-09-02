import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('followers')
@UseGuards(JwtAuthGuard)
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post(':userId')
  toggleFollow(
    @Param('userId') userId: string,
    @GetUser('_id') currentUserId: string,
  ) {
    return this.followersService.toggleFollow(currentUserId, userId);
  }

  @Get(':userId/followers')
  getFollowers(@Param('userId') userId: string) {
    return this.followersService.getFollowers(userId);
  }

  @Get(':userId/following')
  getFollowing(@Param('userId') userId: string) {
    return this.followersService.getFollowing(userId);
  }

  @Get(':userId/is-following')
  isFollowing(
    @Param('userId') userId: string,
    @GetUser('_id') currentUserId: string,
  ) {
    return this.followersService.isFollowing(currentUserId, userId);
  }
}