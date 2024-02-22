import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"

export const uploadImg = () => FileInterceptor("hinh_anh",
    {
        storage: diskStorage({
            destination: process.cwd() + "/public/img",
            filename: (req, file, callback) => callback(null, Date.now() + "_" + file.originalname)
        })
    }
)

