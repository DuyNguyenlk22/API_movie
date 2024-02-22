import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    tai_khoan: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    ho_ten: string

    @ApiProperty()
    @IsNotEmpty()
    so_dt: string

    @ApiProperty()
    @IsNotEmpty()
    loai_nguoi_dung: string
}