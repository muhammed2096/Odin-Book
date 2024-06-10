import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { getAllFollowers, removeFromFollowers } from './controller/followers.controller.js'
import { paramsIdVal } from './followers.validation.js'


const followersRouter = express.Router()

followersRouter.route("/")
// .patch(protectedRoutes, allowedTo('user'), validation(followSomeoneVal), followSomeone)
.get(protectedRoutes, allowedTo('user'), getAllFollowers)


followersRouter.route("/:id")
.delete(protectedRoutes, allowedTo('user'), validation(paramsIdVal), removeFromFollowers)

export default followersRouter