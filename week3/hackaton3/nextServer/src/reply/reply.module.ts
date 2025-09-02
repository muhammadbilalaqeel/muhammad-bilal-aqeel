import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reply, ReplySchema } from 'src/schemas/reply.schema';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
    ReviewModule, // Import ReviewModule (it already exports ReviewModel + ReviewService)
  ],
  providers: [ReplyService],
  exports: [ReplyService], // <-- export if other modules need it
})
export class ReplyModule {}
