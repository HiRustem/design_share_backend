import { Controller, Get, Patch, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Patch()
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.id, dto);
  }

  @Delete()
  deleteAccount(@Req() req) {
    return this.userService.deleteAccount(req.user.id);
  }
}
