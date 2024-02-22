import { Controller, Get, Post, Body, Delete, HttpCode, HttpStatus, Query, Req, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListUserPaginatedDto } from './dto/listUserPaginate.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { InfoLogin } from './dto/infoLogin.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AddUserDto } from './dto/addUser.dto';
import { InfoUser } from './dto/infoUser.dto';
import { UserService } from './user.service';
import { Request } from 'express';


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
  @ApiQuery({ name: "tuKhoa" })
  findUser(@Query() query: { tuKhoa: string }) {
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

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get("ThongTinTaiKhoan")
  getUserById(@Req() req: Request) {
    return this.userService.getUserById(req)
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Put("CapNhatThongTinNguoiDung")
  updateUser(@Body() body: UpdateUserDto) {
    return this.userService.updateUser(body)
  }


}
