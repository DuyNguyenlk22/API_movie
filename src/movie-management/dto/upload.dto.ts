import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UploadDTO {

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

    @ApiProperty({ description: "mm/dd/yyyy" })
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

    @ApiProperty({
        type: "string", format: "binary"
    })
    hinh_anh: any
}