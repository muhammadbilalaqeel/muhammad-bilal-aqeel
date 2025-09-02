import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService : CommentService){}

  // Create top-level comment
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComment(@Request() req, @Body() dto: createCommentDto) {
    const userId = req.user.userId;
    return this.commentService.createComment(userId, dto);
  }

  // Create reply
  @UseGuards(AuthGuard('jwt'))
  @Post(':commentId/replies')
  async createReply(
    @Request() req,
    @Param('commentId') commentId: string,
    @Body('comment') comment: string,
  ) {
    const userId = req.user.userId;

    return this.commentService.createComment(userId, {
      comment,
      parentComment: commentId,
    });
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/all/:postId')
async getAllComments(@Param('postId') postId: string) {
  return this.commentService.getAllComments(postId);
}


  @UseGuards(AuthGuard('jwt'))
  @Post(':commentId/like')
  async likeComment(@Req() req, @Param('commentId') commentId: string) {
    const userId = req.user.userId;
    return this.commentService.toggleLike(userId, commentId);
  }


}
