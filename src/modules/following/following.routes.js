import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { followSomeone, getAllFollowing, removeFromFollowing } from './controller/following.controller.js'
import { followSomeoneVal, paramsIdVal } from './following.validation.js'


const followingRouter = express.Router()

followingRouter.route("/")
.patch(protectedRoutes, allowedTo('user'), validation(followSomeoneVal), followSomeone)
.get(protectedRoutes, allowedTo('user'), getAllFollowing)


followingRouter.route("/:id")
.delete(protectedRoutes, allowedTo('user'), validation(paramsIdVal), removeFromFollowing)

export default followingRouter