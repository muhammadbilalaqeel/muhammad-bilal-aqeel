import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WishlistItemDocument = HydratedDocument<WishlistItem>;

@Schema({ timestamps: true })
export class WishlistItem {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Car', required: true })
  car: Types.ObjectId;

}

export const WishlistItemSchema = SchemaFactory.createForClass(WishlistItem);


WishlistItemSchema.index({ user: 1, car: 1 }, { unique: true });
