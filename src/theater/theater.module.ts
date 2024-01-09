import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { MovieManagementService } from 'src/movie-management/movie-management.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TheaterController],
  providers: [TheaterService, MovieManagementService],
})
export class TheaterModule { }
