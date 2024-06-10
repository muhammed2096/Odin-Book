import mongoose from "mongoose";


const schema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }],
    comments: {
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    date: { type: Date, default: Date.now },
    is_edited: { type: Boolean, default: false },
    hashtags: [{ type: String }],
    imgCover:String,
    images:[String],
}, {
    timestamps: true
})


export const postModel = mongoose.model("post", schema)