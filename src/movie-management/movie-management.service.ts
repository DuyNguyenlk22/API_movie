import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import { GetListMoviePaginate } from './dto/getListMoviePaginate.dto';
import { GetListMovieByDate } from './dto/getListMovieByDate.dto';
import { DataMovieDto } from './dto/dataMovie.dto';
import { validate } from 'class-validator';

@Injectable()
export class MovieManagementService {

  prisma = new PrismaClient()

  async getBanner() {
    try {
      let listBanner = await this.prisma.banner.findMany()
      return responseData(200, "Successfully", listBanner)
    } catch (error) {
      throw new ForbiddenException(error.response)
    }
  }

  async getListMovie() {
    try {
      let listMovie = await this.prisma.phim.findMany();
      return responseData(200, "Successfully", listMovie)
    } catch (error) {
      throw new ForbiddenException(error.response)
    }
  }

  async getListMoviePaginate(query: GetListMoviePaginate) {
    try {
      let page = Number(query.soTrang);
      let pageSize = Number(query.soPhanTuTrenTrang);
      let index = (page - 1) * pageSize;
      let dataCount = await this.prisma.phim.count();
      let totalPage = Math.ceil(dataCount / pageSize)
      let data = await this.prisma.phim.findMany({
        skip: index,
        take: pageSize
      })

      return responseData(200, "Successfully", { data, totalPage })
    } catch (error) {
      throw new ForbiddenException(error.response)
    }
  }

  async getListMovieByDay(query1: GetListMovieByDate) {
    try {
      let page = Number(query1.soTrang);
      let pageSize = Number(query1.soPhanTuTrenTrang);
      let index = (page - 1) * pageSize;
      let fromDay = new Date(query1.tuNgay).toISOString()
      let toDay = new Date(query1.denNgay).toISOString()

      let dataByDay = await this.prisma.phim.findMany({
        where: {
          ngay_khoi_chieu: {
            gte: fromDay,
            lte: toDay,
          },
        },
        skip: index,
        take: pageSize,
      });

      return responseData(200, "Successfully", dataByDay)

    } catch (error) {
      throw new ForbiddenException(error.response)
    }
  }

  async getMovieById(param: string) {
    try {
      let data = await this.prisma.phim.findUnique({
        where: {
          ma_phim: Number(param)
        }
      })
      return responseData(200, "Successfully", data)
    } catch (error) {
      throw new ForbiddenException(error.response)
    }
  }


  async addMovie(formData: DataMovieDto, hinhAnh: any) {
    try {
      let { ten_phim, trailer, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu } = formData

      let movie = {
        ten_phim,
        trailer,
        mo_ta,
        ngay_khoi_chieu: new Date(ngay_khoi_chieu),
        danh_gia: Number(danh_gia),
        hot: Boolean(hot),
        dang_chieu: Boolean(dang_chieu),
        sap_chieu: Boolean(sap_chieu),
        hinh_anh: hinhAnh.originalname
      }
      await this.prisma.phim.create({ data: movie })

      return responseData(201, "Movie added successfully", movie)

    } catch (error) {
      throw new ForbiddenException(error.response)
    }
  }

}
