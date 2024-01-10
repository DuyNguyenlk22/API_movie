import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, Req, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { InfoUser } from './dto/infoUser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfoLogin } from './dto/infoLogin.dto';
import { ListUserPaginatedDto } from './dto/listUserPaginate.dto';
import { FindUserDto } from './dto/findUser.dto';
import { AddUserDto } from './dto/addUser.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/guard/jwt.guard';


@ApiTags("QuanLyNguoiDung")

@Controller('api/QuanLyNguoiDung')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post("DangKy")
  signUp(@Body() body: InfoUser) {
    return this.userService.signUp(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post("DangNhap")
  signIn(@Body() body: InfoLogin) {
    return this.userService.signIn(body)
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get("LayDanhSachNguoiDung")
  getListUser() {
    return this.userService.getListUser()
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get("LayDanhSachNguoiDungPhanTrang")
  getListUserPaginate(@Query() query: ListUserPaginatedDto) {
    return this.userService.getListUserPaginate(query)
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get("TimKiemNguoiDung")
  findUser(@Query() query: FindUserDto) {
    return this.userService.findUser(query)
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get("TimKiemNguoiDungPhanTrang")
  findUserPaginate(@Query() query: FindUserDto) {
    return this.userService.findUserPaginate(query)
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post("ThemNguoiDung")
  addNewUser(@Body() body: AddUserDto) {
    return this.userService.addNewUser(body)
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete("XoaNguoiDung")
  deleteUser(@Query() query: { taiKhoan: string }, @Req() req: Request) {
    return this.userService.deleteUser(query, req)
  }

  @Get("ThongTinTaiKhoan")
  getUserById(@Req() req: Request) {
    return this.userService.getUserById(req)
  }

  @Put("CapNhatThongTinNguoiDung")
  updateUser(@Body() body: AddUserDto, @Req() req: Request) {
    return this.userService.updateUser(body, req)
  }


}
