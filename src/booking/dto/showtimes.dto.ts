import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ShowtimesDto {
    @ApiProperty()
    @IsNotEmpty()
    ma_phim: number

    @ApiProperty()
    @IsNotEmpty()
    ngay_gio_chieu: string

    @ApiProperty()
    @IsNotEmpty()
    ma_rap: number

    @ApiProperty()
    @IsNotEmpty()
    gia_ve: number
}