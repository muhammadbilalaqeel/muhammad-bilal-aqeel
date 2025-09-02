import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type userDocument = User & Document;

@Schema({timestamps:true})
export class User {
  
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({default:''})
  bio: string;

  @Prop({default:''})
  profilePicture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] })
  followers: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] })
  following: mongoose.Types.ObjectId[];
}


export const UserSchema = SchemaFactory.createForClass(User)