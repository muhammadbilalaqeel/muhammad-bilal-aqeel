import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/auth.schema";

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, maxLength: 50, minLength: 5 })
  title: string;

  @Prop({ required: true, maxLength: 150, minLength: 10 })
  content: string;

  @Prop(
    raw({
      type: mongoose.Schema.Types.ObjectId,
      ref: () => User,
      required: true,
    }),
  )
  author: mongoose.Types.ObjectId;

  @Prop(
    raw([
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: () => User,
      },
    ]),
  )
  likes: mongoose.Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
