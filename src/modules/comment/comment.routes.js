import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addCommentVal, paramsIdVal, updateCommentVal,  } from './comment.validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { addComment, deleteComment, getAllComments, getSingleComment, updateComment } from './controller/comment.controller.js'



const commentRouter = express.Router()

commentRouter.route("/")
.get(protectedRoutes, getAllComments)

commentRouter.post('/:post', protectedRoutes, allowedTo('user'), validation(addCommentVal), addComment)

commentRouter.route("/:id")
.get(protectedRoutes, validation(paramsIdVal), getSingleComment)
.put(protectedRoutes,allowedTo('user'),  validation(updateCommentVal), updateComment)
.delete(protectedRoutes,allowedTo('user'),  validation(paramsIdVal), deleteComment)

export default commentRouter