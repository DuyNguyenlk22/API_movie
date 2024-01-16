import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingDto } from './dto/booking.dto';
import { Request } from 'express';
import { ShowtimesDto } from './dto/showtimes.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

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
