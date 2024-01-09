import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class TheaterService {
  prisma = new PrismaClient()
  constructor() { }

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
                  LichChieu: {
                    include: {
                      Phim: true
                    }
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

}
