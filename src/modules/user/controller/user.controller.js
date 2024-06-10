import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"
import { userModel } from "../../../../db/models/user.model.js"
import { cloudinaryConfig } from "../../../utils/cloudinaryConfig.js"



const addUser = catchError(async (req, res, next)=>{
    let user = new userModel(req.body)
    await user.save()
    res.json({message:"Success", user:{name:user.name, email:user.email}})
}
)
const getAllUsers = catchError(async (req, res, next)=>{
    let apiFeature = new apiFeatures(userModel.find(), req.query).fields().pagination().sort().filter().search('name')
    let users = await apiFeature.mongooseQuery
    !users && next(new appError('users not found', 404))
    users && res.send({ message: 'success', page: apiFeature.pageNumber, users })
})

const getSingleUser = catchError(async (req, res, next)=>{
    let user = await userModel.findById(req.params.id)
    !user && next(new appError("Category not found :(", 404))
    user && res.json({message:"Success", user})
})

const updateUser = catchError(async (req, res, next)=>{
    let { profilePic } = await userModel.findById(req.params.id)
    !profilePic && next(new appError('category not found', 404))
        let publicId = profilePic.split('/').pop().split('.')[0]
        console.log(publicId);
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path)
        req.body.profilePic = image.url
    let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    !user && next(new appError("Category not found :(", 404))
    user && res.json({message:"Success", user})
})

const deleteUser = catchError(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.params.id)
    let publicId = user.profilePic.split('/').pop().split('.')[0]
    await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
    !user && next(new appError('user not found', 404))
    user && res.send({ message: 'success' })
})

export{
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}