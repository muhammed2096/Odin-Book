
import { postModel } from "../../../../db/models/post.model.js"
import { getAll, like, removeFromLike } from "../../handler/handlers.js"



const likePost = like(postModel)

const removeLike = removeFromLike(postModel)

const getAllLikes = getAll(postModel)



export{ 
    likePost,
    removeLike,
    getAllLikes 
}