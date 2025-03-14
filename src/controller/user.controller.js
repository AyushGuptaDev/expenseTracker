import { User } from "../model/user.model.js";
import {  uploadonCloudnery } from "../utils/cloudnery.js";
const registerUser=async (req,res)=>{

        
        const {userName,email,password}=req.body;

        
        if ([userName,email,password].some(field=>
            field?.trim()===""))
            {
                return res.status(400).json({message:"all fields are required"});
            }
        
        const existUser=await User.findOne(
            {$or:[{userName},{email}]}
        )  
        
        if(existUser){
            return res.status(400).json({message:"userName or email already exists"});
        }

        let coverImageUrl="";

        const filepath=req.file?.path;
        
        if(filepath){
            
            const coverImage=await uploadonCloudnery(filepath)
            coverImageUrl=coverImage.secure_url;
        }

        const user= await User.create({
            userName : userName.toLowerCase(),
            email,
            password,
            coverImage:coverImageUrl
        });


        const createduser=await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createduser){
            return res.status(400).json({message:"something went wrong while creating user"});
        }

        return res.status(201).json(
            {
                message: "user created successfully",
                user:createduser
            }
        )
}


export {registerUser}