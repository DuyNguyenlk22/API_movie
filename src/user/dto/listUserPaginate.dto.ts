import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ListUserPaginatedDto {
    @ApiProperty()
    @IsNotEmpty()
    soTrang: string

    @ApiProperty()
    @IsNotEmpty()
    soPhanTuTrenTrang: string

}