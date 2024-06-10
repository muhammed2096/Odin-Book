import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { likePostVal, paramsIdVal } from './like.validation.js'
import { getAllLikes, likePost, removeLike } from './controller/like.controller.js'


const likeRouter = express.Router()

likeRouter.route("/")
.patch(protectedRoutes, allowedTo('user'), validation(likePostVal), likePost)
.get(protectedRoutes, getAllLikes)


likeRouter.route("/:id")
.delete(protectedRoutes, allowedTo('user'), validation(paramsIdVal), removeLike)

export default likeRouter