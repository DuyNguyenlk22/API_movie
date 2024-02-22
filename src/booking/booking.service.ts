import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import { JwtService } from '@nestjs/jwt';
import { ShowtimesDto } from './dto/showtimes.dto';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  prisma = new PrismaClient()
  constructor(private jwtService: JwtService) { }

  async layDanhSachPhongVe(query: { maLichChieu: string }) {
    try {
      let { maLichChieu } = query
      if (!maLichChieu) responseData(400, "Invalid data", "maLichChieu invalid")
      let thongTinPhim = await this.prisma.lichChieu.findFirst({
        where: { ma_lich_chieu: Number(maLichChieu) },
        include: {
          Phim: { select: { ten_phim: true, hinh_anh: true } },
          RapPhim: { select: { ten_rap: true, CumRap: { select: { ten_cum_rap: true, dia_chi: true, } } } }
        }
      })
      let danhSachGhe = await this.prisma.lichChieu.findFirst({
        where: { ma_lich_chieu: Number(maLichChieu) },
        select: { RapPhim: { select: { Ghe: true } } }
      })
      let { ma_lich_chieu, ngay_gio_chieu, Phim, RapPhim } = thongTinPhim

      let results = {
        thongTinPhim: {
          ma_lich_chieu,
          ten_cum_rap: RapPhim.CumRap.ten_cum_rap,
          ten_rap: RapPhim.ten_rap,
          dia_chi: RapPhim.CumRap.dia_chi,
          ten_phim: Phim.ten_phim,
          hinh_anh: Phim.hinh_anh,
          ngay_gio_chieu
        },
        danhSachGhe: danhSachGhe.RapPhim.Ghe
      }

      return responseData(200, "Handled successfully", results)
    } catch (exception) {
      console.log("😐 ~ BookingService ~ layDanhSachPhongVe ~ exception:👉", exception)
    }
  }

  async booking(body: BookingDto, req: any) {
    try {
      let token = req.headers.authorization.slice(7)
      let { tai_khoan } = this.jwtService.decode(token).data
      let { ma_lich_chieu, danh_sach_ve } = body

      let lichChieu = await this.prisma.lichChieu.findUnique({
        where: { ma_lich_chieu }
      })
      if (!lichChieu) throw new HttpException("ma_lich_chieu invalid", HttpStatus.NOT_FOUND)

      await Promise.all(
        danh_sach_ve.map(async (item) => {
          const checkData = await this.prisma.ghe.findUnique({
            where: { ma_ghe: item.ma_ghe }
          })
          if (checkData === null) throw new HttpException("ma_ghe invalid", HttpStatus.NOT_FOUND)
          if (checkData.taiKhoanNguoiDat !== "") throw new HttpException("Fail...", HttpStatus.BAD_REQUEST)

          await this.prisma.ghe.update({
            where: { ma_ghe: item.ma_ghe },
            data: {
              daDat: true,
              taiKhoanNguoiDat: tai_khoan
            }
          })
        }))

      let newData = danh_sach_ve.map((item) => {
        return {
          tai_khoan,
          ma_lich_chieu,
          ma_ghe: item.ma_ghe,
          ngay_dat: new Date().toISOString(),
          gia_ve: item.gia_ve
        }
      })
      let results = await this.prisma.datVe.createMany({
        data: newData
      })

      return responseData(201, "Booked successfully", results)

    } catch (err) {
      return responseData(err.status, err.response, err.option)
    }
  }

  async addShowtimes(body: ShowtimesDto) {
    try {

      let { ma_phim, ngay_gio_chieu, ma_rap, gia_ve } = body

      let checkPhim = await this.prisma.phim.findUnique({ where: { ma_phim } })
      if (checkPhim === null) throw new HttpException("ma_phim invalid", HttpStatus.NOT_FOUND)

      let checkRap = await this.prisma.rapPhim.findUnique({ where: { ma_rap } })
      if (checkRap === null) throw new HttpException("ma_rap invalid", HttpStatus.NOT_FOUND)

      if (gia_ve <= 0) throw new HttpException("gia_ve must be a positive number", HttpStatus.BAD_REQUEST)

      let newShowtimes = {
        ma_phim,
        ngay_gio_chieu: new Date(ngay_gio_chieu),
        ma_rap,
        gia_ve
      }

      await this.prisma.lichChieu.create({ data: newShowtimes })
      return responseData(201, "Handled successfully", newShowtimes)
    } catch (exception) {
      return responseData(exception.status, exception.response, exception.options)
    }
  }
}
