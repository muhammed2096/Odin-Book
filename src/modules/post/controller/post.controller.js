import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"
import { postModel } from "../../../../db/models/post.model.js"
import { cloudinaryConfig } from "../../../utils/cloudinaryConfig.js"




const addPost = catchError(async (req, res, next)=>{
    const coverImageResult = await cloudinaryConfig().uploader.upload(req.files.imgCover[0].path);
    const uploadPromises = req.files.images.map(async (file) => {
        const result = await cloudinaryConfig().uploader.upload(file.path);
        return result.url;
    });
    const images = await Promise.all(uploadPromises);
    req.body.imgCover = coverImageResult.url;
    req.body.images = images;
    let post = new postModel({
        ...req.body,
        date: Date.now(),
        author: req.user._id
    })
    await post.save()
    res.json({message:"Success", post})
})

const getAllPosts = catchError(async (req, res, next)=>{
    let apiFeature = new apiFeatures(postModel.find(), req.query).fields().pagination().sort().filter().search('author', 'content')
    let posts = await apiFeature.mongooseQuery
    !posts && next(new appError('posts not found', 404))
    posts && res.send({ message: 'success', page: apiFeature.pageNumber, posts })
})

const getSinglePost = catchError(async (req, res, next)=>{
    let post = await postModel.findById(req.params.id).populate('author', 'name')
    !post && next(new appError("post not found :(", 404))
    post && res.json({message:"Success", post})
})

const updatePost = catchError(async (req, res, next)=>{
    let publicId = product.imageCover.split('/').pop().split('.')[0]
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path)
        req.body.imageCover = image.url
    let post = await postModel.findByIdAndUpdate(req.params.id, {...req.body, is_edited:true, date: Date.now()}, {new:true})
    !post && next(new appError("post not found :(", 404))
    post && res.json({message:"Success", post})
})

const deletePost = catchError(async (req, res, next) => {
    const post = await postModel.findByIdAndDelete(req.params.id)
    let publicId = post.imgCover.split('/').pop().split('.')[0]
    await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
    !post && next(new appError('post not found', 404))
    post && res.send({ message: 'success' })
})


export{
    addPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost
}