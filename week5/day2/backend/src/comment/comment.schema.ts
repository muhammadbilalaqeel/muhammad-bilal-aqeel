import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/auth.schema";
import { Post } from "src/post/post.schema";

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name})
  postId: mongoose.Schema.Types.ObjectId;


  @Prop(  raw({
        type: mongoose.Schema.Types.ObjectId,
        ref: () => User,
        required: true,
      }),)
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, maxLength: 150, minLength: 2 })
  comment: string;

  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null })
  parentComment: mongoose.Schema.Types.ObjectId | null;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }], default: [] })
  likes: mongoose.Schema.Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
