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
        ref: 'comment'
    }],
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    date: { type: Date, default: Date.now },
    is_edited: { type: Boolean, default: false }
}, {
    timestamps: true
})


export const commentModel = mongoose.model("comment", schema)