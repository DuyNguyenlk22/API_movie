import { ApiProperty } from "@nestjs/swagger";


class SeatDto {
    @ApiProperty()
    ma_ghe: number

    @ApiProperty()
    gia_ve: number

    ten_ghe: string
    loai_ghe: string
    ma_rap: number
    daDat: boolean
    taiKhoanNguoiDat: string

}

export class BookingDto {
    @ApiProperty()
    ma_lich_chieu: number

    @ApiProperty({ type: [SeatDto] })
    danh_sach_ve: SeatDto[]

}

