import { Controller, Get, Post, Param, Delete, Query, ValidationPipe, UseInterceptors, UploadedFile, Body, Req, BadRequestException } from '@nestjs/common';
import { MovieManagementService } from './movie-management.service';
import { ApiBody, ApiConsumes, ApiTags, ApiProperty } from '@nestjs/swagger';
import { GetListMoviePaginate } from './dto/getListMoviePaginate.dto';
import { GetListMovieByDate } from './dto/getListMovieByDate.dto';
import { UploadDTO } from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DataMovieDto } from './dto/dataMovie.dto';
import { validate } from 'class-validator';
import { addImg } from 'src/config/upload';



@ApiTags("QuanLyPhim")
@Controller('api/QuanLyPhim')
export class MovieManagementController {

  constructor(private readonly movieService: MovieManagementService) { }

  @Get("LayDanhSachBanner")
  getBanner() {
    return this.movieService.getBanner();
  }

  @Get("LayDanhSachPhim")
  getListMovie() {
    return this.movieService.getListMovie();
  }

  @Get("LayDanhSachPhimPhanTrang")
  getListMoviePaginate(@Query(new ValidationPipe()) query: GetListMoviePaginate) {
    return this.movieService.getListMoviePaginate(query)
  }

  @Get("LayDanhSachPhimTheoNgay")
  getListMovieByDay(@Query() query1: GetListMovieByDate) {
    return this.movieService.getListMovieByDay(query1)
  }

  @Get("LayThongTinPhim/:maPhim")
  getMovieById(@Param("maPhim") param: string) {
    return this.movieService.getMovieById(param)
  }



  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadDTO
  })

  @Post("ThemPhimUploadHinh")
  @UseInterceptors(addImg())
  addMovie(@Body() formData: UploadDTO, @UploadedFile() hinhAnh: Express.Multer.File[]) {
    return this.movieService.addMovie(formData, hinhAnh)
  }



}
