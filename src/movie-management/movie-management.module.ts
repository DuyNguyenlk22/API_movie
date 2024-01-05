import { Module } from '@nestjs/common';
import { MovieManagementService } from './movie-management.service';
import { MovieManagementController } from './movie-management.controller';

@Module({
  controllers: [MovieManagementController],
  providers: [MovieManagementService],
})
export class MovieManagementModule {}
