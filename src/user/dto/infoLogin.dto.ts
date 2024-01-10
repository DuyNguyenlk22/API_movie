import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class InfoLogin {

    @ApiProperty()
    tai_khoan: string

    @ApiProperty()
    mat_khau: string

}