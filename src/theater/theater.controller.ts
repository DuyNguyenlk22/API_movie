import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("QuanLyRap")
@Controller('api/QuanLyRap')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) { }

  @Get("LayThongTinHeThongRap")
  @ApiQuery({ name: "maHeThongRap", required: false })
  getInfoTheater(@Query() query: { maHeThongRap: string }) {
    return this.theaterService.getInfoTheater(query)
  }

  @Get("LayThongTinCumRapTheoHeThong")
  @ApiQuery({ name: "maHeThongRap" })
  layThongTinCumRapTheoHeThong(@Query() query: { maHeThongRap: string }) {
    return this.theaterService.layThongTinCumRapTheoHeThong(query)
  }

  @Get("LayThongTinLichChieuHeThongRap")
  @ApiQuery({ name: "maHeThongRap" })
  layThongTinLichChieuHeThongRap(@Query() query: { maHeThongRap: string }) {
    return this.theaterService.layThongTinLichChieuHeThongRap(query)
  }

  @Get("LayThongTinLichChieuPhim")
  @ApiQuery({ name: "maPhim" })
  layThongTinLichChieuPhim(@Query() query: { maPhim: string }) {
    return this.theaterService.layThongTinLichChieuPhim(query)
  }
}
