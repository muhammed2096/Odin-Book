import express from 'express'
import { validation } from '../../middleware/validation.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import { changePassword,  forgetPassword, isVerify, protectedRoutes, resetPassword, signin, signup } from './controller/auth.controller.js'
import { changePasswordVal,  forgetPasswordVal, isverifyVal, resetPasswordVal, signinVal, signupVal } from './auth.validation.js'
import { checkCode } from '../../middleware/checkCode.js'
import { uploadSingleField } from '../../services/fileUpload/fileUploads.js'


const authRouter = express.Router()

authRouter.post('/signup', uploadSingleField('image'), validation(signupVal), checkEmail, signup)
authRouter.post('/signin', validation(signinVal), signin)
authRouter.patch('/changepassword', protectedRoutes, validation(changePasswordVal), changePassword)
authRouter.get('/verification', protectedRoutes, validation(isverifyVal), isVerify)
authRouter.post('/forgotPassword', validation(forgetPasswordVal), forgetPassword)
authRouter.post('/resetPassword', checkCode, validation(resetPasswordVal), resetPassword)

export default authRouter