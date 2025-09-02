import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
 @UseGuards(AuthGuard)
     @Get('profile')
  async getProfile(@Request() req) {
      console.log(req)
      const {userId} = req.user
    return this.userService.getProfile(userId);
  }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserByID(@Param() param){
        const {id} = param;
        return this.userService.getUserById(id)
    }

    @Patch(':id')
  @UseGuards(AuthGuard) // protect route with JWT
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Request() req
  ) {

    const response = await this.userService.updateUser(id, dto);
    return response; // { statusCode, message, data? }
  }

       
}
