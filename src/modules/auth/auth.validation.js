import joi from 'joi'

const signupVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required(),
    role: joi.string().valid('user','admin').optional(),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    }).optional()
})
const signinVal = joi.object({   
    email:joi.string().email().required(),
    password:joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()
})
const changePasswordVal = joi.object({   
    oldPassword:joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    newPassword : joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    reNewPassword:joi.valid(joi.ref('newPassword')).required()
})

const isverifyVal = joi.object({
    code:joi.string().required()
})

const forgetPasswordVal = joi.object({
    email:joi.string().email().required()
})
// const checkCodeVal = joi.object({
//     code:joi.string().required(),
//     email:joi.string().email().required()
// })

const resetPasswordVal = joi.object({
    email:joi.string().email().required(),
    code:joi.string().required(),
    newPassword: joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    reNewPassword: joi.valid(joi.ref('newPassword')).required()
})


export {
    signupVal,
    signinVal,
    changePasswordVal,
    isverifyVal,
    forgetPasswordVal,
    // checkCodeVal,
    resetPasswordVal
}