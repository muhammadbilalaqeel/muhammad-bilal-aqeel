import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

import { User } from "./user.schema";
import { ref } from "process";
import { Reply } from 'src/schemas/reply.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Product' })
  prodId: Types.ObjectId;

  @Prop(raw({ type: mongoose.Schema.Types.ObjectId, required: true, ref:()=>User }))
  userId: Types.ObjectId;

  @Prop({ required: true })
  review: string;

//   @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
//   likes: Types.ObjectId[];

//   @Prop({ type: [{ type: Types.ObjectId, ref: 'Reply' }] })
//   reply: (Types.ObjectId | Reply)[]; 

  @Prop(raw([{
    type : mongoose.Schema.Types.ObjectId,
    ref:()=>Reply
  }]))
   reply : mongoose.Types.ObjectId[]
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

export const ReviewSchema = SchemaFactory.createForClass(Review);
