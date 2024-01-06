import { Module } from '@nestjs/common';
import { MovieManagementService } from './movie-management.service';
import { MovieManagementController } from './movie-management.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [MovieManagementController],
  providers: [MovieManagementService],
})
export class MovieManagementModule { }
