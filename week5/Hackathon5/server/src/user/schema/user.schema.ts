import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
class Address {
  @Prop() country?: string;
  @Prop() city?: string;
  @Prop() address1?: string;
  @Prop() address2?: string;
  @Prop() landLineNumber?: string;
  @Prop() poBox?: string;
}
const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ _id: false })
class TrafficFile {
  @Prop() informationType?: string;                
  @Prop() trafficFileNumber?: string;               
  @Prop() plateNumber?: string;
  @Prop() plateState?: string;
  @Prop() plateCode?: string;
  @Prop() driverLicenseNumber?: string;
  @Prop() issueCity?: string;
}
const TrafficFileSchema = SchemaFactory.createForClass(TrafficFile);

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    trim: true,
  }) fullName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  }) email: string;

  @Prop({
    unique: true,
    lowercase: true,
    trim: true,
  }) username: string;

  @Prop({
    unique: true,
    trim: true,
  }) mobileNumber: string;

  @Prop({ required: true, select: false }) password: string;

  @Prop() avatarUrl?: string;


  @Prop() nationality?: string;
  @Prop() idType?: string;                         
  @Prop() idNumber?: string;

  // Sections
  @Prop({ type: AddressSchema }) address?: Address;
  @Prop({ type: TrafficFileSchema }) trafficFile?: TrafficFile;

  @Prop({ type: [String], default: ['user'] }) roles: string[];
  @Prop({ default: 'active', enum: ['active', 'suspended'] }) status: 'active' | 'suspended';

  @Prop() emailVerifiedAt?: Date;
  @Prop() phoneVerifiedAt?: Date;

  @Prop() acceptedTermsAt?: Date;
  @Prop() acceptedTermsVersion?: string;

  @Prop(raw([{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]))
  myCars?: mongoose.Schema.Types.ObjectId[];

  @Prop(raw([{ type: mongoose.Schema.Types.ObjectId, ref:'Car' }]))
  bids?: mongoose.Schema.Types.ObjectId[];

  @Prop(raw([{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]))
  wishlist?: mongoose.Schema.Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ 'address.country': 1, 'address.city': 1 });
