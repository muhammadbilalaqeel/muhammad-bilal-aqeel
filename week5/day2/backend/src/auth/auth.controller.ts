import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    const {userId} = req.user;
    return this.authService.getUserById(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
async getByUsername(@Param('username') username: string) {
  return this.authService.findByUsername(username);
}


@UseGuards(AuthGuard('jwt'))
@Post('toggle-follow')
async ToggleFollow(@Body() targetId:string, @Request() req){
    const {userId} = req.user;
    return this.ToggleFollow(userId,targetId)
}


}
