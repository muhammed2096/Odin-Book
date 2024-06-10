import joi from 'joi'

const likeCommentVal = joi.object({
    post: joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const removeLikeVal = joi.object({
    user: joi.string().hex().length(24).required()
})
export {
    likeCommentVal,
    paramsIdVal,
    removeLikeVal
}