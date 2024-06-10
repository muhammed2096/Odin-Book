

import { commentModel } from "../../../../db/models/comment.model.js"
import { getAll, like, removeFromLike } from "../../handler/handlers.js"



const likeComment = like(commentModel)

const removeLike = removeFromLike(commentModel)

const getAllLikes = getAll(commentModel)



export{ 
    likeComment,
    removeLike,
    getAllLikes 
}