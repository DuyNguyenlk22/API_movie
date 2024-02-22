import { ListUserPaginatedDto } from "./listUserPaginate.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FindUserDto extends ListUserPaginatedDto {
    @ApiProperty()
    @IsNotEmpty()
    tuKhoa: string
}