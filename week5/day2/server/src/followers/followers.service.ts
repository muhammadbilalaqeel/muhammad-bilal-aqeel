import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follower, FollowerDocument } from './schemas/follower.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
    private usersService: UsersService,
  ) {}

  async toggleFollow(followerId: string, followingId: string): Promise<{ following: boolean }> {
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    const existingFollow = await this.followerModel.findOne({
      follower: followerId,
      following: followingId,
    });

    if (existingFollow) {
      // Unfollow
      await this.followerModel.deleteOne({ _id: existingFollow._id });
      await this.usersService.updateFollowerCount(followingId, -1);
      await this.usersService.updateFollowingCount(followerId, -1);
      return { following: false };
    } else {
      // Follow
      await this.followerModel.create({
        follower: followerId,
        following: followingId,
      });
      await this.usersService.updateFollowerCount(followingId, 1);
      await this.usersService.updateFollowingCount(followerId, 1);
      return { following: true };
    }
  }

  async getFollowers(userId: string) {
    return this.followerModel
      .find({ following: userId })
      .populate('follower', 'username profilePicture')
      .exec();
  }

  async getFollowing(userId: string) {
    return this.followerModel
      .find({ follower: userId })
      .populate('following', 'username profilePicture')
      .exec();
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await this.followerModel.findOne({
      follower: followerId,
      following: followingId,
    });
    return !!follow;
  }
}