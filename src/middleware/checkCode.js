import { userModel } from "../../db/models/user.model.js"
import { appError } from "../utils/appError.js"
import { catchError } from "./catchError.js"

export const checkCode = catchError(async (req, res, next) => {
    let { email, code } = req.body
    let verify = await userModel.findOne({ email: email, resetCode: code })
    if (!verify) return next(new appError('code invalid', 401))
    next()
})