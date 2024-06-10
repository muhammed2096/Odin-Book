import joi from 'joi'

const followSomeoneVal = joi.object({
    user: joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const removeFromFollowingVal = joi.object({
    user: joi.string().hex().length(24).required()
})
export {
    followSomeoneVal,
    paramsIdVal,
    removeFromFollowingVal
}