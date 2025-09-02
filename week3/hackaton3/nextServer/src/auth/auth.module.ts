import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema : UserSchema}]),
    JwtModule.register({
  secret: process.env.JWT_SECRET, // must match Express
  signOptions: { expiresIn: '1h' },
})
  ],
  providers: [AuthService],
  controllers: [UserController]
})
export class AuthModule {}
