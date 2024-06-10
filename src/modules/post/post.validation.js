import joi from 'joi'

const addPostVal = joi.object({
    content: joi.string().max(300).trim().required(),
    hashtags: joi.string().pattern(/\b#\w+/).optional(),
    imgCover: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).optional(),
    images: joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required()
    })).optional(),
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updatePostVal = joi.object({
    id:joi.string().hex().length(24).required(),
    content: joi.string().max(300).trim().optional(),
    hashtags: joi.string().pattern(/\b#\w+/).optional()
})
export {
    addPostVal,
    paramsIdVal,
    updatePostVal
}