import { MovieManagementService } from 'src/movie-management/movie-management.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { responseData } from 'src/config/response';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TheaterService {
  prisma = new PrismaClient()
  constructor(private movieService: MovieManagementService) { }

  async getInfoTheater(query: { maHeThongRap: string }) {
    try {
      let { maHeThongRap } = query
      if (maHeThongRap) {
        let dataSearch = await this.prisma.heThongRap.findFirst({
          where: { ma_he_thong_rap: { contains: query.maHeThongRap } }
        })
        return responseData(200, "Handled successfully", dataSearch)
      }

      let data = await this.prisma.heThongRap.findMany()
      return responseData(200, "Handled successfully", data)

    } catch (exception) {
      throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async layThongTinCumRapTheoHeThong(query: { maHeThongRap: string }) {
    try {
      let { maHeThongRap } = query
      let data = await this.prisma.cumRap.findMany({
        where: { ma_he_thong_rap: { contains: maHeThongRap } },
        include: { RapPhim: { select: { ma_rap: true, ten_rap: true } } }
      })
      data.map((item) => { delete item.ma_he_thong_rap })
      return responseData(200, "Handled successfully", data)
    } catch (exception) {
      throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async layThongTinLichChieuHeThongRap() {
    try {
      let heThongRap = await this.prisma.heThongRap.findMany({
        include: {
          CumRap: {
            select: {
              ma_cum_rap: true,
              ten_cum_rap: true,
              dia_chi: true,
              RapPhim: { include: { Phim: true } }
            }
          }
        }
      })

      let lichChieuArr = await this.prisma.lichChieu.findMany()

      const results = heThongRap.map((item) => {
        return {
          ma_he_thong_rap: item.ma_he_thong_rap,
          ten_he_thong_rap: item.ten_he_thong_rap,
          logo: item.logo,
          lstCumRap: item.CumRap.map((item1) => {
            return {
              ma_cum_rap: item1.ma_cum_rap,
              ten_cum_rap: item1.ten_cum_rap,
              dia_chi: item1.dia_chi,
              danhSachPhim: item1.RapPhim.map((item2) => {
                return {
                  ...item2.Phim,
                  lstLichChieuTheoPhim: lichChieuArr.filter((item3) => item3.ma_phim === item2.ma_phim)
                }
              })
            }
          })
        }
      })
      return responseData(200, "Handled successfully", results)
    } catch (exception) {
      let { status, response, options } = exception
      return responseData(status, response, options)
    }
  }

  async layThongTinLichChieuPhim(query: { maPhim: string }) {
    try {
      let { maPhim } = query
      if (!maPhim) responseData(400, "Data not founded", "maPhim not exist")
      const infoMovie = await this.movieService.getMovieById(maPhim)

      const cumRapChieu = await this.prisma.heThongRap.findMany({
        include: {
          CumRap: {
            include: {
              RapPhim: {
                select: {
                  ten_rap: true,
                  ma_rap: true,
                  LichChieu: {
                    select: {
                      ma_lich_chieu: true,
                      ngay_gio_chieu: true,
                      gia_ve: true
                    },
                    where: { ma_phim: Number(maPhim) }
                  }
                }
              }
            }
          }
        }
      })
      return responseData(200, "Handled successfully", { ...infoMovie.content, heThongRapChieu: cumRapChieu })
    } catch (exception) {
      let { status, response, options } = exception
      return responseData(status, response, options)
    }
  }

}
