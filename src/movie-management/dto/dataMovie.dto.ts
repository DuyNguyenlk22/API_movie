import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class DataMovieDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ten_phim: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    trailer: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mo_ta: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ngay_khoi_chieu: string

    @ApiProperty()
    @IsNotEmpty()
    danh_gia: number

    @ApiProperty()
    hot: boolean

    @ApiProperty()
    dang_chieu: boolean

    @ApiProperty()
    sap_chieu: boolean
}