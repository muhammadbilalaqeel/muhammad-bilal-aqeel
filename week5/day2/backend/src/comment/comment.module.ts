import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { PostSchema } from 'src/post/post.schema';
import { NotificationModule } from 'src/notification/notification.module';
import { Post } from 'src/post/post.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
  MongooseModule.forFeature([{name:Comment.name,schema:CommentSchema}]),
     MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), 
    NotificationModule,
    AuthModule
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
