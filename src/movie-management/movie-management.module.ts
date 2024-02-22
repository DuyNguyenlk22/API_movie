import { MovieManagementController } from './movie-management.controller';
import { MovieManagementService } from './movie-management.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [MovieManagementController],
  providers: [MovieManagementService],
})
export class MovieManagementModule { }
