import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"

export const addImg = () => FileInterceptor("hinh_anh",
    {
        storage: diskStorage({
            destination: process.cwd() + "/public/img",
            filename: (req, file, callback) => {
                return callback(null, Date.now() + "_" + file.originalname
                )
            }
        })
    }
)

