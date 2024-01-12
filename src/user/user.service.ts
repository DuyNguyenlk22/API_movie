import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {

    prisma = new PrismaClient()

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signUp(body: InfoUser) {
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
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }


    }

    async signIn(body: InfoLogin) {
        try {
            let { tai_khoan, mat_khau } = body

            let checkUser = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan,
                }
            })
            if (checkUser) {
                if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
                    let token = this.jwtService.signAsync(
                        { data: { tai_khoan: checkUser.tai_khoan, loai_nguoi_dung: checkUser.loai_nguoi_dung } },
                        { expiresIn: "3d", secret: this.configService.get("SECRET_KEY") }
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
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async getListUser() {
        try {
            let listUser = await this.prisma.nguoiDung.findMany()
            listUser.map((item) => {
                return delete item.mat_khau
            })
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

    async findUser(query: FindUserDto) {
        try {
            let searchUser = await this.prisma.nguoiDung.findMany({
                where: {
                    OR: [
                        {
                            tai_khoan: {
                                contains: query.tuKhoa
                            }
                        },
                        {
                            email: {
                                contains: query.tuKhoa
                            }
                        },
                        {
                            ho_ten: {
                                contains: query.tuKhoa
                            }
                        }
                    ]
                }
            })

            return responseData(200, "Handled successfully", searchUser)
        } catch (exception) {
            throw new HttpException("Error...", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findUserPaginate(query: FindUserDto) {
        4
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
                        {
                            tai_khoan: {
                                contains: tuKhoa
                            }
                        },
                        {
                            email: {
                                contains: tuKhoa
                            }
                        },
                        {
                            ho_ten: {
                                contains: tuKhoa
                            }
                        }
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
            let checkUser = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan
                }
            })
            if (checkUser) return responseData(404, "Account already exist", "")
            let checkEmail = await this.prisma.nguoiDung.findFirst({
                where: {
                    email
                }
            })
            if (checkEmail) return responseData(404, "Email already exist", "")
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
            console.log("😐 ~ UserService ~ addNewUser ~ exception:👉", exception)
        }
    }

    async deleteUser(query: { taiKhoan: string }, req: any) {
        try {
            let token = req.headers.authorization.slice(7)
            let accessToken = this.jwtService.decode(token)
            let { loai_nguoi_dung } = accessToken.data

            if (loai_nguoi_dung !== "admin") throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)

            let result = await this.prisma.nguoiDung.delete({
                where: {
                    tai_khoan: query.taiKhoan
                }
            })
            delete result.mat_khau
            return responseData(200, "Handled successfully", result)
        } catch (exception) {
            throw new HttpException("This user has booked cannot be deleted", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserById(req: any) {
        try {
            let token = req.headers.authorization.slice(7)
            let accessToken = this.jwtService.decode(token).data

            let infoUser = await this.prisma.nguoiDung.findUnique({
                where: { tai_khoan: accessToken.tai_khoan }
            })
            let lichChieuTheoPhim = await this.prisma.phim.findMany({
                select: {
                    ten_phim: true, hinh_anh: true,
                    LichChieu: {
                        include: {
                            DatVe: {
                                include: {
                                    Ghe: {
                                        include: {
                                            RapPhim: {
                                                include: {
                                                    CumRap: {
                                                        include: { HeThongRap: true }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                where: { tai_khoan: accessToken.tai_khoan }
                            }
                        }
                    }
                }
            })
            delete infoUser.mat_khau
            let result = {
                ...infoUser,
                thongTinDatVe: lichChieuTheoPhim
            }
            return responseData(200, "Handled successfully", result)
        } catch (exception) {
            console.log("😐 ~ UserService ~ getUserById ~ exception:👉", exception)
        }
    }

    async updateUser(body: AddUserDto, req: any) {
        try {
            let { tai_khoan, email, ho_ten, so_dt, loai_nguoi_dung } = body
            let token = req.headers.authorization.slice(7)
            let accessToken = this.jwtService.decode(token).data

            if (tai_khoan !== accessToken.tai_khoan) throw new HttpException("Tài khoản không thể thay đổi", HttpStatus.BAD_REQUEST)

            let newData = {
                ho_ten,
                email,
                so_dt,
                loai_nguoi_dung,
            }

            let result = await this.prisma.nguoiDung.update({
                data: newData,
                where: {
                    tai_khoan: accessToken.tai_khoan
                }
            })
            return responseData(200, "Cập nhật thành công", result)

        } catch (exception) {
            return responseData(exception.status, exception.response, "")
        }
    }

}
