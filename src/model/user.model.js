import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            unique:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String
        },
        refreshToken:{
            type: String
        }
    },{timestamps:true}
)
userSchema.pre("save",async function (next) {
    
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})


userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.genrateAcessToken= function () {
    return jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName
    },process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
};

userSchema.methods.genrateRefreshToken= function () {
    return jwt.sign({
        _id:this._id,
        email:this.email
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

export const User=mongoose.model("User",userSchema)