import { ApiProperty } from "@nestjs/swagger";


class SeatDto {
    @ApiProperty() ma_ghe: number

    @ApiProperty() gia_ve: number


}

export class BookingDto {
    @ApiProperty() ma_lich_chieu: number

    ngay_dat: string

    @ApiProperty({ type: [SeatDto] }) danh_sach_ve: SeatDto[]

}

