import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { createUserdto, LoginDto } from 'src/user/dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

   @Post('login')
   async login(@Body() dto : LoginDto){
        return this.authService.login(dto) 
   }


    @Post('register')
    async register(@Body() dto:createUserdto){
        return this.authService.register(dto)
    }
}
