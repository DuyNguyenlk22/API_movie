import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InfoUser } from './dto/infoUser.dto';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InfoLogin } from './dto/infoLogin.dto';
import { ListUserPaginatedDto } from './dto/listUserPaginate.dto';
import { FindUserDto } from './dto/findUser.dto';
import { AddUserDto } from './dto/addUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {

    prisma = new PrismaClient()

    constructor(private jwtService: JwtService, private configService: ConfigService) { }

    async signUp(body: InfoUser) {
        try {
            let { tai_khoan, email, mat_khau, ho_ten, so_dt } = body

            let checkUser = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan, } })
            if (checkUser) throw new HttpException("Account already exists", HttpStatus.BAD_REQUEST)

            let checkEmail = await this.prisma.nguoiDung.findFirst({ where: { email, } })
            if (checkEmail) throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST)

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
            let { status, response, options } = exception
            return responseData(status, response, options)
        }
    }

    async signIn(body: InfoLogin) {
        try {
            let { tai_khoan, mat_khau } = body
            let checkUser = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan, } })
            if (checkUser) {
                if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
                    let token = this.jwtService.signAsync(
                        { data: { tai_khoan: checkUser.tai_khoan, loai_nguoi_dung: checkUser.loai_nguoi_dung } },
                        { expiresIn: "10d", secret: this.configService.get("SECRET_KEY") }
                    )
                    delete checkUser.mat_khau
                    return responseData(200, "Successfully", { ...checkUser, accessToken: await token })
                } else {
                    throw new HttpException("Password incorrect", HttpStatus.BAD_REQUEST)
                }
            } else {
                throw new HttpException("Account incorrect", HttpStatus.BAD_REQUEST)

            }
        } catch (exception) {
            let { status, response, options } = exception
            return responseData(status, response, options)
        }

    }

    async getListUser() {
        try {
            let listUser = await this.prisma.nguoiDung.findMany()
            listUser.map((item) => { delete item.mat_khau })
            return responseData(200, "Handled successfully", listUser)
        } catch (exception) {
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getListUserPaginate(query: ListUserPaginatedDto) {
        try {
            let { soTrang, soPhanTuTrenTrang } = query
            let index = (Number(soTrang) - 1) * Number(soPhanTuTrenTrang)
            let dataCount = await this.prisma.nguoiDung.count();
            let totalPage = Math.ceil(dataCount / Number(soPhanTuTrenTrang))

            let data = await this.prisma.nguoiDung.findMany({
                skip: index,
                take: Number(soPhanTuTrenTrang)
            })
            return responseData(200, "Handled successfully",
                {
                    currentPage: +soTrang,
                    count: +soPhanTuTrenTrang,
                    totalPage,
                    totalCount: dataCount,
                    items: data
                })
        } catch (error) {
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findUser(query: { tuKhoa: string }) {
        try {
            let searchUser = await this.prisma.nguoiDung.findMany({
                where: {
                    OR: [
                        { tai_khoan: { contains: query.tuKhoa } },
                        { email: { contains: query.tuKhoa } },
                        { ho_ten: { contains: query.tuKhoa } }
                    ]
                }
            })
            return responseData(200, "Handled successfully", searchUser)
        } catch (exception) {
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findUserPaginate(query: FindUserDto) {
        try {
            let { soTrang, soPhanTuTrenTrang, tuKhoa } = query
            let index = (Number(soTrang) - 1) * Number(soPhanTuTrenTrang)
            let dataCount = await this.prisma.nguoiDung.count();
            let totalPage = Math.ceil(dataCount / Number(soPhanTuTrenTrang))

            let data = await this.prisma.nguoiDung.findMany({
                skip: index,
                take: Number(soPhanTuTrenTrang),
                where: {
                    OR: [
                        { tai_khoan: { contains: tuKhoa } },
                        { email: { contains: tuKhoa } },
                        { ho_ten: { contains: tuKhoa } }
                    ]
                }
            })
            return responseData(200, "Handled successfully",
                {
                    currentPage: +soTrang,
                    count: +soPhanTuTrenTrang,
                    totalPage,
                    totalCount: dataCount,
                    items: data
                })
        } catch (exception) {
            console.log("😐 ~ UserService ~ findUserPaginate ~ exception:👉", exception)
        }
    }

    async addNewUser(body: AddUserDto) {
        try {
            let { email, tai_khoan, mat_khau, ho_ten, so_dt, loai_nguoi_dung } = body

            let checkUser = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan } })
            if (checkUser) throw new HttpException("Account already exist", HttpStatus.BAD_REQUEST)

            let checkEmail = await this.prisma.nguoiDung.findFirst({ where: { email } })
            if (checkEmail) throw new HttpException("Email already exist", HttpStatus.BAD_REQUEST)

            let dataUser = {
                email,
                tai_khoan,
                mat_khau: bcrypt.hashSync(mat_khau, 10),
                ho_ten,
                so_dt,
                loai_nguoi_dung
            }
            let newUser = await this.prisma.nguoiDung.create({ data: dataUser })
            delete newUser.mat_khau
            return responseData(201, "Handled successfully", newUser)
        } catch (exception) {
            let { status, response, options } = exception
            return responseData(status, response, options)
        }
    }

    async deleteUser(query: { taiKhoan: string }, req: any) {
        try {
            const { taiKhoan } = query
            const token = req.headers.authorization.slice(7)
            let { loai_nguoi_dung } = this.jwtService.decode(token).data

            if (loai_nguoi_dung !== "admin") throw new ForbiddenException("Forbidden")

            let checkUser = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
            if (!checkUser) throw new HttpException("taiKhoan Invalid", HttpStatus.NOT_FOUND)

            let checkBooked = await this.prisma.datVe.findMany({ where: { tai_khoan: taiKhoan } })
            if (checkBooked) throw new HttpException("taiKhoan has booked , can't delete", HttpStatus.BAD_REQUEST)

            let result = await this.prisma.nguoiDung.delete({ where: { tai_khoan: taiKhoan } })

            delete result.mat_khau
            return responseData(200, "Handled successfully", result)
        } catch (exception) {
            let { status, response, options } = exception
            return responseData(status, response, options)
        }
    }

    async getUserById(req: any) {
        try {
            let token = req.headers.authorization.slice(7)
            let { tai_khoan } = this.jwtService.decode(token).data
            let infoUser = await this.prisma.nguoiDung.findUnique({ where: { tai_khoan: tai_khoan } })
            delete infoUser.mat_khau
            let thongTinPhim = await this.prisma.datVe.findMany({
                where: { tai_khoan: tai_khoan },
                include: { LichChieu: true, Ghe: { include: { RapPhim: { include: { CumRap: { include: { HeThongRap: true } } } } } } }
            })

            const thongTinDatVe = await Promise.all(
                thongTinPhim.map(async (item) => {
                    const movie = await this.prisma.phim.findUnique({
                        where: { ma_phim: item.LichChieu.ma_phim },
                        select: { ten_phim: true, hinh_anh: true }
                    })

                    let { ma_he_thong_rap, ten_he_thong_rap } = item.Ghe.RapPhim.CumRap.HeThongRap
                    let { ten_cum_rap, ma_cum_rap } = item.Ghe.RapPhim.CumRap
                    let { ma_rap, ten_rap } = item.Ghe.RapPhim
                    let { ma_ghe, ten_ghe } = item.Ghe

                    const danhSachGhe = {
                        ma_he_thong_rap,
                        ten_he_thong_rap,
                        ma_cum_rap,
                        ten_cum_rap,
                        ma_rap,
                        ten_rap,
                        ma_ghe,
                        ten_ghe
                    }
                    return {
                        danhSachGhe,
                        ngay_dat: item.ngay_dat,
                        gia_ve: item.gia_ve,
                        ...movie
                    }
                })
            )
            const result = {
                ...infoUser,
                thongTinDatVe
            }
            return responseData(200, "Handled successfully", result)
        } catch (exception) {
            let { status, response, options } = exception
            return responseData(status, response, options)
        }
    }

    async updateUser(body: UpdateUserDto) {
        try {
            let { tai_khoan, email, ho_ten, so_dt, loai_nguoi_dung } = body
            let newData = {
                tai_khoan,
                ho_ten,
                email,
                so_dt,
                loai_nguoi_dung,
            }
            let result = await this.prisma.nguoiDung.update({
                data: newData,
                where: { tai_khoan }
            })
            return responseData(200, "Updated successfully", result)
        } catch (exception) {
            let { status, response, options } = exception
            return responseData(status, response, options)
        }
    }

}
