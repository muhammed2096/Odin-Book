
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { userModel } from "../../../../db/models/user.model.js"



const removeFromFollowers = catchError(async (req, res, next) => {
    let followers = await userModel.findByIdAndUpdate(req.user._id, {$pull:{followers: req.params.id}}, {new:true}).populate('followers', '_id name')
    !followers && next(new appError('followers not found', 404))
    followers && res.send({ message: 'success', followers: followers.followers })
})

const getAllFollowers = catchError(async (req, res, next) => {
    let {followers} = await userModel.findById(req.user._id)
    !followers && next(new appError('followers not found', 404))
    followers && res.send({ message: 'success', followers })
})



export{
    removeFromFollowers,
    getAllFollowers 
}