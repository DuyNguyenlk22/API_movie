import { GetListMoviePaginate } from "./getListMoviePaginate.dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class GetListMovieByDate extends GetListMoviePaginate {

    @ApiProperty({ description: "mm/dd/yyyy" })
    @IsNotEmpty()
    tuNgay: string

    @ApiProperty({ description: "mm/dd/yyyy" })
    @IsNotEmpty()
    denNgay: string
}