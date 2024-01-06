import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { InfoUser } from './dto/infoUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { InfoLogin } from './dto/infoLogin.dto';


@ApiTags("QuanLyNguoiDung")
@Controller('api/QuanLyNguoiDung')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post("DangKy")
  signIn(@Body() body: InfoUser) {
    return this.userService.signIn(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post("DangNhap")
  signUp(@Body() body1: InfoLogin) {
    return this.userService.signUp(body1)
  }

}
