import { Module } from '@nestjs/common';
import { MovieManagementModule } from './movie-management/movie-management.module';

@Module({
  imports: [MovieManagementModule],
})
export class AppModule { }
