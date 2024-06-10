import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addPostVal,  paramsIdVal, updatePostVal } from './post.validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { addPost, deletePost, getAllPosts, getSinglePost, updatePost } from './controller/post.controller.js'
import { uploadFields } from '../../services/fileUpload/fileUploads.js'


const postRouter = express.Router()

postRouter.route("/")
.post(protectedRoutes,allowedTo('user'), uploadFields([
    {name:"imgCover", maxCount: 1},
    {name:"images", maxCount: 10}
]), validation(addPostVal), addPost)
.get(protectedRoutes, getAllPosts)


postRouter.route("/:id")
.get(protectedRoutes, validation(paramsIdVal), getSinglePost)
.put(protectedRoutes,allowedTo('user'),  validation(updatePostVal),updatePost)
.delete(protectedRoutes,allowedTo('user'),  validation(paramsIdVal),deletePost)

export default postRouter