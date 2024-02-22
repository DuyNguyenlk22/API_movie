import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { InfoLogin } from "./infoLogin.dto";

export class InfoUser extends InfoLogin {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    ho_ten: string

    @ApiProperty()
    @IsNotEmpty()
    so_dt: string

}