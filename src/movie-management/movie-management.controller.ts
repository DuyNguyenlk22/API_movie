import { Controller, Get, Post, Delete, Query, ValidationPipe, UseInterceptors, UploadedFile, Body, Req, BadRequestException, UseGuards, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseFilePipeBuilder, HttpStatus, Put, ForbiddenException } from '@nestjs/common';
import { MovieManagementService } from './movie-management.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetListMoviePaginate } from './dto/getListMoviePaginate.dto';
import { GetListMovieByDate } from './dto/getListMovieByDate.dto';
import { UploadDTO } from './dto/upload.dto';
import { addImg } from 'src/config/upload';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UpdateMovieDto } from './dto/movieUpdate.dto';



@ApiTags("QuanLyPhim")
@UseGuards(JwtGuard)
@ApiBearerAuth()
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
  getListMovieByDate(@Query() query1: GetListMovieByDate) {
    return this.movieService.getListMovieByDate(query1)
  }

  @Get("LayThongTinPhim")
  getMovieById(@Query("maPhim") maPhim: string) {
    return this.movieService.getMovieById(maPhim)
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadDTO
  })
  @Post("ThemPhimUploadHinh")
  @UseInterceptors(addImg())
  addMovie(@Body() formData: UploadDTO, @UploadedFile(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({
        maxSize: 800000
      }).build({
        exceptionFactory(error) {
          throw new ForbiddenException(error)
        }
      }),
  ) hinhAnh: Express.Multer.File[]) {
    return this.movieService.addMovie(formData, hinhAnh)
  }

  @Delete("XoaPhim")
  deleteMovie(@Query("maPhim") maPhim: string) {
    return this.movieService.deleteMovie(maPhim)
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UpdateMovieDto
  })
  @Put("CapNhatPhimUpload")
  @UseInterceptors(addImg())
  updateMovie(@Body() body: UpdateMovieDto,
    @UploadedFile() hinhAnh: Express.Multer.File[]
  ) {
    return this.movieService.updateMovie(body, hinhAnh)
  }


}
