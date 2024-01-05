import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { GetListMoviePaginate } from "./getListMoviePaginate.dto";

export class GetListMovieByDate extends GetListMoviePaginate {

    @ApiProperty({ description: "mm/dd/yyyy" })
    @IsNotEmpty()
    tuNgay: string

    @ApiProperty({ description: "mm/dd/yyyy" })
    @IsNotEmpty()
    denNgay: string
}