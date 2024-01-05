import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieManagementDto } from './create-movie-management.dto';

export class UpdateMovieManagementDto extends PartialType(CreateMovieManagementDto) {}
