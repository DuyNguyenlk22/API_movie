import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ListUserPaginatedDto } from "./listUserPaginate.dto";

export class FindUserDto extends ListUserPaginatedDto {
    @ApiProperty()
    @IsNotEmpty()
    tuKhoa: string
}