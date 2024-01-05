import { ForbiddenException, HttpCode, HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class MovieManagementService {

  prisma = new PrismaClient()


  async getBanner() {
    try {
      let listBanner = await this.prisma.banner.findMany({
        include: {
          Phim: true
        }
      })
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

}
