import joi from 'joi'

const addCommentVal = joi.object({
    content: joi.string().max(300).trim().required(),
    post: joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateCommentVal = joi.object({
    id:joi.string().hex().length(24).required(),
    content: joi.string().max(300).trim().optional(),
})
export {
    addCommentVal,
    paramsIdVal,
    updateCommentVal
}