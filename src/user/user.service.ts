import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InfoUser } from './dto/infoUser.dto';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InfoLogin } from './dto/infoLogin.dto';

@Injectable()
export class UserService {

    prisma = new PrismaClient()

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signIn(body: InfoUser) {
        try {
            let { tai_khoan, email, mat_khau, ho_ten, so_dt } = body

            let checkUser = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan,
                }
            })
            if (checkUser) return responseData(403, "Account already exists", "")

            let checkEmail = await this.prisma.nguoiDung.findFirst({
                where: {
                    email,
                }
            })
            if (checkEmail) return responseData(404, "Email already exists", "")

            let dataUser = {
                tai_khoan,
                email,
                mat_khau: bcrypt.hashSync(mat_khau, 10),
                ho_ten,
                so_dt,
                loai_nguoi_dung: "user"
            }

            let results = await this.prisma.nguoiDung.create({ data: dataUser })
            delete results.mat_khau;
            return responseData(201, "Successfully", results)
        } catch (exception) {
            console.log("😐 ~ UserService ~ signIn ~ exception:👉", exception)
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }


    }

    async signUp(body1: InfoLogin) {
        try {
            let { tai_khoan, mat_khau } = body1

            let checkUser = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan,
                }
            })
            if (checkUser) {
                if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
                    let token = this.jwtService.signAsync(
                        { data: { tai_khoan: checkUser.tai_khoan } },
                        { expiresIn: "20m", secret: this.configService.get("SECRET_KEY") }
                    )
                    delete checkUser.mat_khau
                    return responseData(200, "Successfully", { ...checkUser, accessToken: await token })
                } else {
                    return responseData(404, "Password incorect", "")
                }
            } else {
                return responseData(404, "Account incorect", "")
            }
        } catch (exception) {
            console.log("😐 ~ UserService ~ signUp ~ exception:👉", exception)
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
