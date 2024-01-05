import { ApiProperty } from '@nestjs/swagger';
import { DataMovieDto } from './dataMovie.dto';
import { IsNotEmpty } from 'class-validator';
export class UploadDTO extends DataMovieDto {
    @ApiProperty({
        type: "string", format: "binary"
    })
    hinhAnh: any
}