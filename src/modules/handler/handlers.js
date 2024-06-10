import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"


export const deleteOne = (model)=>{
    return catchError( async (req, res, next)=>{
        let document = await model.findByIdAndDelete(req.params.id)
        !document && next(new appError("Document not found :(", 404))
        document && res.json({message:"Success", document})
    })
}

export const like = (model)=>{
    return catchError(async (req, res, next)=>{
        let like = await model.findByIdAndUpdate(req.body.post, {$addToSet:{likes: req.user._id}}, {new:true})
        !like && next(new appError('user not found', 404))
        like && res.send({ message: 'success'})
    })
}

export const removeFromLike = (model)=>{
    return catchError(async (req, res, next)=>{
        let like = await model.findByIdAndUpdate(req.user._id, {$pull:{like: req.params.id}}, {new:true})
        !like && next(new appError('like not found', 404))
        like && res.send({ message: 'success'})
    })
}

export const getAll = (model)=>{
    return catchError(async (req, res, next)=>{
        let {likes} = await model.findById(req.user._id)
        !likes && next(new appError('likes not found', 404))
        likes && res.send({ message: 'success', likes })
    })
}

