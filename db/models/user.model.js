import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:[3, "user name is too short"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['user', 'admin', 'guest'],
        default:'user',
        lowercase:true
    },
    passwordChangedAt:Date,
    verifyCode: String,
    resetCode: String,
    isverify: {
        type: Boolean,
        default: false
    },
    profilePic:String,
    followers: [{
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }],
    following: [{
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }]
},{
    timestamps:true
})
schema.pre('save',function(){
   if(this.password) this.password = bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})

export const userModel = mongoose.model("user", schema)