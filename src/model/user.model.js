import mongoose from "mongoose";


const userSchema=new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            unique:true
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

export const User=mongoose.model("User",userSchema)