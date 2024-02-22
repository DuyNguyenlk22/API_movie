import { MovieManagementService } from 'src/movie-management/movie-management.service';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TheaterController],
  providers: [TheaterService, MovieManagementService],
})
export class TheaterModule { }
