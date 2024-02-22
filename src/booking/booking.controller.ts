import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { ShowtimesDto } from './dto/showtimes.dto';
import { BookingDto } from './dto/booking.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Request } from 'express';

@ApiTags("QuanLyDatVe")
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('api/QuanLyDatVe')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get("LayDanhSachPhongVe")
  @ApiQuery({ name: "maLichChieu" })
  layDanhSachPhongVe(@Query() query: { maLichChieu: string }) {
    return this.bookingService.layDanhSachPhongVe(query)
  }

  @Post("DatVe")
  booking(@Body() body: BookingDto, @Req() req: Request) {
    return this.bookingService.booking(body, req)
  }

  @Post("TaoLichChieu")
  addShowtimes(@Body() body: ShowtimesDto) {
    return this.bookingService.addShowtimes(body)
  }
}
