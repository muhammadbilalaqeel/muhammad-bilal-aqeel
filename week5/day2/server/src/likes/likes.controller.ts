import { Controller, Post, Param, UseGuards, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { NotificationsService } from '../notifications/notifications.service';
import { CommentsService } from '../comments/comments.service';

@Controller('likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly notificationsService: NotificationsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post(':commentId')
  async toggleLike(
    @Param('commentId') commentId: string,
    @GetUser('_id') userId: string,
  ) {
    const result = await this.likesService.toggleLike(userId, commentId);
    
    // Send notification if liked
    if (result.liked) {
      const comment = await this.commentsService.findById(commentId);
      if (comment.author.toString() !== userId) {
        await this.notificationsService.createNotification({
          recipient: comment.author.toString(),
          type: 'like',
          message: 'Someone liked your comment',
          relatedComment: commentId,
        });
      }
    }

    return result;
  }

  @Get('user')
  getUserLikes(@GetUser('_id') userId: string) {
    return this.likesService.getUserLikes(userId);
  }
}