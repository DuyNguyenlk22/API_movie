import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieManagementService } from './movie-management.service';

@Controller('/api/QuanLyPhim')
export class MovieManagementController {
  constructor(private movieService: MovieManagementService) { }

  @Get("LayDanhSachBanner")
  GetListBanner() {
    return this.movieService.getBanner();
  }

  @Get("LayDanhSachPhim")
  GetListMovie() {
    return this.movieService.getListMovie();
  }


}
