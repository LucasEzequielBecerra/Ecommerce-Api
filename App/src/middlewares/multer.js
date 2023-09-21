import multer from "multer";
import { __dirname } from "../utils.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'profile') {
            cb(null, __dirname + '/public/profile')
        }
        if (file.fieldname === 'products') {
            cb(null, __dirname + '/public/products')
        }
        else if (file.fieldname !== 'profile' && file.fieldname !== 'products') {
            cb(null, __dirname + '/public/images')
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

export const uploader = multer({ storage })