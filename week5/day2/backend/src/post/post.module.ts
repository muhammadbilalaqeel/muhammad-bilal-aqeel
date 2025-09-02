import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { NotificationGateway } from 'src/notification/notification.gateway';
// import { NotificationService } from 'src/notification/notification.service';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from 'src/notification/notification.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    NotificationModule,
    AuthModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
