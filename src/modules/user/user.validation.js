import joi from 'joi'

const addUserVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateUserVal = joi.object({
    id:joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(100).trim().optional(),
    role: joi.string().valid('user','admin', 'guest').optional()
})
export {
    addUserVal,
    paramsIdVal,
    updateUserVal
}