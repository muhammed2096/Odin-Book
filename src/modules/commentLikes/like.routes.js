import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { likeCommentVal, paramsIdVal } from './like.validation.js'
import { getAllLikes, likeComment, removeLike } from './controller/like.controller.js'


const likeRouter = express.Router()

likeRouter.route("/")
.patch(protectedRoutes, allowedTo('user'), validation(likeCommentVal), likeComment)
.get(protectedRoutes, getAllLikes)


likeRouter.route("/:id")
.delete(protectedRoutes, allowedTo('user'), validation(paramsIdVal), removeLike)

export default likeRouter