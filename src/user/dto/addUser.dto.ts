import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { InfoUser } from "./infoUser.dto";

export class AddUserDto extends InfoUser {
    @ApiProperty()
    @IsNotEmpty()
    loai_nguoi_dung: string
}