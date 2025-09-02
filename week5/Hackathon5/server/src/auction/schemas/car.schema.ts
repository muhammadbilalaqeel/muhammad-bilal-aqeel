import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CarDocument = HydratedDocument<Car> &  {
  status?: 'draft' | 'live' | 'sold' | 'ended';
};

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Car {
  _id: Types.ObjectId;

  // Who listed it
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ required: true }) first_name: string;
  @Prop({ required: true }) last_name: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) phone_number: string;

  // Auction info
  @Prop() startsAt: Date;
  @Prop({ required: true }) endsAt: Date;
  @Prop() reservePrice?: number;
  @Prop({ default: 0 }) totalBids: number;
  @Prop({default:0}) currentBidAmount?: number;
  @Prop({ type: Types.ObjectId, ref: 'User' }) currentLeader?: Types.ObjectId;

  // Display fields
  // @Prop({ required: true }) title: string;   // e.g. BMW M4
  @Prop() make?: string;
  @Prop() model?: string;
  @Prop() year?: string;

  // Extra specs
  @Prop({ required: true, unique: true }) vin: string;
  @Prop() mileage?: number;
  @Prop() engine_size?: string;
  @Prop({ required: true }) paint: string;
  @Prop({ default: 'No' }) has_gcc_specs: string;
  @Prop() noteworthy_features?: string;
  @Prop({ default: 'No' }) accident_history: string;
  @Prop({ default: 'No' }) service_history: string;
  @Prop({ required: true, enum: ['Completely stock', 'Modified'] })
  modified_status: string;
  
  // Bidding
  @Prop() max_bid?: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: false }) trending: boolean;

  @Prop({ default: false })
sold: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);

// Indexing for searches
CarSchema.index({ endsAt: 1 });
CarSchema.index({ make: 'text', model: 'text' });

// Hook: default startsAt = createdAt
CarSchema.pre<CarDocument>('save', function (next) {
  if (!this.startsAt) {
    this.startsAt = this.createdAt;
  }
  next();
});

CarSchema.virtual('status').get(function (this: CarDocument) {
  if (this.sold) return 'sold'; 

  const now = new Date();
  if (now < this.startsAt) return 'draft';
  if (now >= this.startsAt && now <= this.endsAt) return 'live';
  return this.currentBidAmount ? 'sold' : 'ended';
});