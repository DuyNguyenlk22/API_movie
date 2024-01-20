import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TheaterService } from './theater.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@ApiTags("QuanLyRap")
@UseGuards(JwtGuard)
@ApiBearerAuth()
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
  layThongTinLichChieuHeThongRap() {
    return this.theaterService.layThongTinLichChieuHeThongRap()
  }

  @Get("LayThongTinLichChieuPhim")
  @ApiQuery({ name: "maPhim" })
  layThongTinLichChieuPhim(@Query() query: { maPhim: string }) {
    return this.theaterService.layThongTinLichChieuPhim(query)
  }
}
