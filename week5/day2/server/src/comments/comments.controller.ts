import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser('_id') userId: string,
  ) {
    const comment = await this.commentsService.create(createCommentDto, userId);
    
    // Send notifications
    if (createCommentDto.parentComment) {
      // Notify the author of the parent comment
      const parentComment = await this.commentsService.findById(createCommentDto.parentComment);
      await this.notificationsService.createNotification({
        recipient: parentComment.author.toString(),
        type: 'reply',
        message: 'Someone replied to your comment',
        relatedComment: comment._id.toString(),
      });
    } else {
      // Notify all users about new comment
      await this.notificationsService.notifyAllUsers({
        type: 'comment',
        message: 'New comment posted',
        relatedComment: comment._id.toString(),
      });
    }

    return comment;
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.commentsService.delete(id, userId);
  }
}