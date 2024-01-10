import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import { BookingDto } from './dto/booking.dto';
import { JwtService } from '@nestjs/jwt';
import { ShowtimesDto } from './dto/showtimes.dto';

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
          Phim: {
            select: {
              ten_phim: true,
              hinh_anh: true
            }
          },
          RapPhim: {
            select: {
              ten_rap: true,
              CumRap: {
                select: {
                  ten_cum_rap: true,
                  dia_chi: true,

                }
              }
            }
          }
        }
      })
      let danhSachGhe = await this.prisma.lichChieu.findFirst({
        where: { ma_lich_chieu: Number(maLichChieu) },
        select: {
          RapPhim: {
            select: {
              Ghe: true
            }
          }
        }
      })
      let { ma_lich_chieu, ngay_gio_chieu, Phim, RapPhim } = thongTinPhim

      return responseData(200, "Handled successfully", {
        thongTinPhim: {
          ma_lich_chieu,
          ten_cum_rap: RapPhim.CumRap.ten_cum_rap,
          ten_rap: RapPhim.ten_rap,
          dia_chi: RapPhim.CumRap.dia_chi,
          ten_phim: Phim.ten_phim,
          hinh_anh: Phim.hinh_anh,
          ngay_gio_chieu
        }
        , danhSachGhe: danhSachGhe.RapPhim.Ghe
      })
    } catch (exception) {
      console.log("😐 ~ BookingService ~ layDanhSachPhongVe ~ exception:👉", exception)
    }
  }

  async booking(body: BookingDto, req: any) {
    try {
      let token = req.headers.authorization.slice(7)
      let accessToken = this.jwtService.decode(token)
      let { ma_lich_chieu, danh_sach_ve } = body
      console.log("😐 ~ BookingService ~ booking ~ body:👉", body)

      let newData = danh_sach_ve.map((item) => {
        return {
          tai_khoan: accessToken.data.tai_khoan,
          ma_lich_chieu,
          ma_ghe: item.ma_ghe,
        }
      })
      let results = await this.prisma.datVe.createMany({
        data: newData
      })
      if (results) {
        await this.prisma.ghe.createMany({
          data: danh_sach_ve.map((item) => {
            return {
              ten_ghe: item.ten_ghe,
              loai_ghe: item.loai_ghe,
              ma_rap: item.ma_rap,
              daDat: item.daDat,
              taiKhoanNguoiDat: accessToken.data.tai_khoan,
              giaVe: item.gia_ve
            }
          })
        })
      }

      return responseData(201, "Booked successfully", results)

    } catch (exception) {
      console.log("😐 ~ BookingService ~ booking ~ exception:👉", exception)
    }
  }

  async addShowtimes(body: ShowtimesDto) {
    try {

      let { ma_phim, ngay_gio_chieu, ma_rap, gia_ve } = body

      let newShowtimes = {
        ma_phim,
        ngay_gio_chieu: new Date(ngay_gio_chieu),
        ma_rap,
        gia_ve
      }

      await this.prisma.lichChieu.create({ data: newShowtimes })
      return responseData(201, "Handled successfully", newShowtimes)
    } catch (exception) {
      console.log("😐 ~ BookingService ~ addShowtimes ~ exception:👉", exception)
    }
  }
}
