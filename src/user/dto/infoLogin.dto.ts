import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class InfoLogin {

    @ApiProperty()
    @IsNotEmpty()
    tai_khoan: string

    @ApiProperty()
    @IsNotEmpty()
    mat_khau: string

}