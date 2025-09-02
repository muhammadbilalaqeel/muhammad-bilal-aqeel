import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose"
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ReplyController } from './reply/reply.controller';
import { ReplyModule } from './reply/reply.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1h' },
}),

     MongooseModule.forRoot(process.env.MONGO_URI!),
     ReviewModule,
     AuthModule,
     ReplyModule
  ],
  controllers: [AppController, ReplyController],
  providers: [AppService],
})
export class AppModule {}
