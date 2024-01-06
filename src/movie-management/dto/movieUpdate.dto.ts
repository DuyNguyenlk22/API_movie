import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UploadDTO } from "./upload.dto";

export class UpdateMovieDto extends UploadDTO {
    @ApiProperty()
    @IsNotEmpty()
    ma_phim: number
}