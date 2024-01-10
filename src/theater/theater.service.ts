import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import { MovieManagementService } from 'src/movie-management/movie-management.service';

@Injectable()
export class TheaterService {
  prisma = new PrismaClient()
  constructor(private movieService: MovieManagementService) { }

  async getInfoTheater(query: { maHeThongRap: string }) {
    try {
      let { maHeThongRap } = query
      if (maHeThongRap) {
        let dataSearch = await this.prisma.heThongRap.findFirst({
          where: {
            ma_he_thong_rap: {
              contains: query.maHeThongRap
            }
          }
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
        where: {
          ma_he_thong_rap: {
            contains: maHeThongRap
          }
        },
        include: {
          RapPhim: true
        }
      })
      data.map((item) => {
        delete item.ma_he_thong_rap
        item.RapPhim.map((item) => {
          delete item.ma_cum_rap
        })
      })
      return responseData(200, "Handled successfully", data)
    } catch (exception) {
      throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async layThongTinLichChieuHeThongRap(query: { maHeThongRap: string }) {
    try {
      let { maHeThongRap } = query
      if (maHeThongRap === "") maHeThongRap = "BHD"

      let data = await this.prisma.heThongRap.findMany({
        include: {
          CumRap: {
            include: {
              RapPhim: {
                include: {
                  Phim: {
                    include: { LichChieu: true }
                  }
                }
              }
            }
          }
        },
        where: {
          ma_he_thong_rap: {
            contains: maHeThongRap
          }
        }
      })
      return responseData(200, "Handled successfully", data)

    } catch (exception) {
      console.log("😐 ~ TheaterService ~ layThongTinLichChieuHeThongRap ~ exception:👉", exception)
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
                    }
                  }
                },
                where: {
                  ma_phim: Number(maPhim)
                }
              }
            }
          }
        }
      })

      return responseData(200, "Handled successfully", { ...infoMovie.content, heThongRapChieu: cumRapChieu })

    } catch (exception) {
      console.log("😐 ~ TheaterService ~ layThongTinLichChieuHeThongRap ~ exception:👉", exception)
    }
  }

}
