
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { userModel } from "../../../../db/models/user.model.js"


const followSomeone = catchError(async (req, res, next) => {
    let following = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{following: req.body.user}}, {new:true}).populate('following', '_id name')
    if(following){
        let followers = await userModel.findByIdAndUpdate(req.body.user, {$addToSet:{followers: req.user._id}}, {new:true}).populate('followers', '_id name')
        res.send({ message: 'success', followers: followers.followers })
    }
    !following && next(new appError('user not found', 404))
    following && res.send({ message: 'success', following: following.following })
})

const removeFromFollowing = catchError(async (req, res, next) => {
    let following = await userModel.findByIdAndUpdate(req.user._id, {$pull:{following: req.params.id}}, {new:true}).populate('following', '_id name')
    !following && next(new appError('following not found', 404))
    following && res.send({ message: 'success', following: following.following })
})

const getAllFollowing = catchError(async (req, res, next) => {
    let {following} = await userModel.findById(req.user._id)
    !following && next(new appError('following not found', 404))
    following && res.send({ message: 'success', following })
})



export{ 
    followSomeone,
    removeFromFollowing,
    getAllFollowing 
}