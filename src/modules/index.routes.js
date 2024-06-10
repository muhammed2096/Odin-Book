import { globalError } from "../middleware/globalError.js"
import authRouter from "./auth/auth.routes.js"
import commentRouter from "./comment/comment.routes.js"
import followersRouter from "./followers/followers.routes.js"
import followingRouter from "./following/following.routes.js"
import postRouter from "./post/post.routes.js"
import likeRouter from "./postLikes/like.routes.js"
import userRouter from "./user/user.routes.js"



export const bootstrap = (app)=>{
    app.get("/", (req, res)=>{
        res.json("welcome back backend dev :)")
    })
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/followers',followersRouter)
    app.use('/api/v1/following',followingRouter)
    app.use('/api/v1/posts',postRouter)
    app.use('/api/v1/comments',commentRouter)
    app.use('/api/v1/likepost',likeRouter)
    app.use('/api/v1/likecomment',likeRouter)
    app.use(globalError)
}