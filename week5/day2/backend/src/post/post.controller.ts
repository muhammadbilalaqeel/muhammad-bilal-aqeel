import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { Post as PostS } from './post.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async CreatePost(@Body() createpostdto:CreatePostDto,@Request() req){
    const {userId} = req.user;

    return this.postService.CreatePost(createpostdto,userId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllPosts(): Promise<{ success: boolean; data: PostS[]; message?: string }> {
    try {
      const posts = await this.postService.findAll();
      if (posts.data.length === 0) {
        return { success: true, data: [], message: 'No posts found' };
      }
      return { success: true, data: posts.data };
    } catch (error) {
      return { success: false, data: [], message: error.message || 'Something went wrong' };
    }
  }


  @UseGuards(AuthGuard('jwt'))
  @Post(':id/toggle-like')
  async toggleLike(@Param('id') postId: string, @Request() req: any) {
    const userId = req.user.userId; 
    return this.postService.toggleLike(postId, userId);
  }
}
