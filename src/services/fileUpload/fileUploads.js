import mongoose from "mongoose"
import multer from "multer"
import { appError } from "../../utils/appError.js"




export const fileUpload = ()=>{
    const storage = multer.diskStorage({})
    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else {
            cb(new appError('image only', 401), false)
        }

        }
    const upload = multer({ storage: storage ,fileFilter})
    return upload
}

export const uploadSingleField = fieldName => fileUpload().single(fieldName)
export const uploadArrayOfFields = fieldName => fileUpload().array(fieldName,10)
export const uploadFields = fieldName => fileUpload().fields(fieldName)