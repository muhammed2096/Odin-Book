import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"
import { deleteOne } from "../../handler/handlers.js"
import { commentModel } from "../../../../db/models/comment.model.js"




const addComment = catchError(async (req, res, next)=>{
    let comment = new commentModel({
        post:req.params.id,
        ...req.body,
        date: Date.now(),
        author: req.user._id
    })
    await comment.save()
    res.json({message:"Success", comment})
})

const getAllComments = catchError(async (req, res, next)=>{
    let apiFeature = new apiFeatures(commentModel.find(), req.query).fields().pagination().sort().filter().search('author', 'content')
    let comments = await apiFeature.mongooseQuery
    !comments && next(new appError('comments not found', 404))
    comments && res.send({ message: 'success', page: apiFeature.pageNumber, comments })
})

const getSingleComment = catchError(async (req, res, next)=>{
    let comment = await commentModel.findById(req.params.id).populate('author', 'name')
    !comment && next(new appError("comment not found :(", 404))
    comment && res.json({message:"Success", comment})
})

const updateComment = catchError(async (req, res, next)=>{
    let comment = await commentModel.findByIdAndUpdate(req.params.id, {...req.body, is_edited:true, date: Date.now()}, {new:true})
    !comment && next(new appError("comment not found :(", 404))
    comment && res.json({message:"Success", comment})
})

const deleteComment = deleteOne(commentModel)

export{
    addComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment
}