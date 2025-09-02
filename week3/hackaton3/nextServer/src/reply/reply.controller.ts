import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateReplyDto } from 'src/dtos/create-reply.dto';

@Controller('reply')
export class ReplyController {
    constructor(private readonly replyService : ReplyService){}

    @UseGuards(AuthGuard)
    @Post()
    async createReply(@Body() dto : CreateReplyDto , @Request() req){
        const userId = req.user.id;
        return this.replyService.createReply(dto,userId)
    }
}
