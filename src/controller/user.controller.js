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
        {$or:[{userName:userName.toLowerCase()},{email:email.toLowerCase()}]}
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
        email:email.toLowerCase(),
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


const loginUser=async (req,res)=>{
    const{userName,email,password}=req.body;

    if((!email?.trim() && !userName?.trim()) || !password?.trim()) {
        return res.status(400).json({ message: "Password and user details are required" });
    }
    

    const user=await User.findOne(
        {$or:[{userName:userName?.toLowerCase()},{email:email?.toLowerCase()}]}
    )
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    if(email?.trim() && email.toLowerCase()!=user.email){
        return res.status(404).json({message:"not mactching email and username"})
    }
    
    if(userName?.trim() && userName.toLowerCase()!=user.userName){
        return res.status(404).json({message:"not mactching email and username"})
    }

    const checkpassword= await user.isPasswordCorrect(password);
    if(!checkpassword){
        return res.status(401).json({message:"incorrect password"});
    }

    const Accesstoken=user.genrateAcessToken();
    const refreshtoken=user.genrateRefreshToken();
    
    user.refreshToken=refreshtoken;
    await user.save();

    const options={
        httpOnly:true,
        secure:true
    }
    const returnAbleUser=user.toObject();
    delete returnAbleUser.password;
    delete returnAbleUser.refreshToken;

    return res.status(200).cookie("accessToken",Accesstoken,options)
    .cookie("refreshToken",refreshtoken,options)
    .json({message:"user loggged in successfully",user:returnAbleUser});
}


const logout=async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure: true
    }
    res.clearCookie("accessToken",options);
    res.clearCookie("refreshToken",options);
    return res.status(200).json({message:"user is loggedout"})
}

const changePassword=async (req,res)=>{
    const {prevPassword,updatedPassword}=req.body;
    if(! prevPassword|| !updatedPassword){
        return res.status(400).json({message:"prevpassword and upadated password are required"})
    }
    
    const user=await User.findById(req.user._id);

    const checkpassword=await user.isPasswordCorrect(prevPassword);
    
    if(!checkpassword){
        return res.status(401).json({message:"incorrect password "});
    }

    user.password=updatedPassword;
    user.save();

    return res.status(200).json({message:"password updated"});
}

export {registerUser,
    loginUser,
    logout,
    changePassword,
}