import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Car } from 'src/auction/schemas/car.schema';
import { User } from 'src/user/schema/user.schema';

export type BidDocument = HydratedDocument<Bid>;

@Schema({ timestamps: true })
export class Bid {
 

  @Prop(raw({ type: mongoose.Schema.Types.ObjectId, ref:()=>Car, required: true }))
  car: mongoose.Schema.Types.ObjectId;

  @Prop(raw({ type: mongoose.Schema.Types.ObjectId, ref: ()=>User, required: true }))
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;
}

export const BidSchema = SchemaFactory.createForClass(Bid);


BidSchema.index({ car: 1, createdAt: -1 });
BidSchema.index({ car: 1, amount: -1 });
BidSchema.index({ user: 1, createdAt: -1 });
