import { Expense } from "../model/expense.model.js";
import { User } from "../model/user.model.js";
import {  uploadonCloudnery , deleteonCloudnery} from "../utils/cloudnery.js";



const registerUser=async (req,res)=>{

    const {userName,email,password}=req.body;

    
    if ([userName,email,password].some(field=>
        field?.trim()===""))
        {
            return res.status(400).json({message:"username ,email and passwors can't be empty"});
        }

    const usernameRegex = /^[a-zA-Z0-9_]+$/; // allows letters, numbers, and underscores only
    if (!usernameRegex.test(userName.trim())) {
        return res.status(400).json({ message: "Username should not contain special characters" });
    }


    const existUser=await User.findOne(
        {$or:[{userName:userName.toLowerCase().trim()},{email:email.toLowerCase().trim()}]}
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
        userName : userName.toLowerCase().trim(),
        email:email.toLowerCase().trim(),
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

    // if(email?.trim() && email.toLowerCase()!=user.email){
    //     return res.status(404).json({message:"not mactching email and username"})
    // }
    
    // if(userName?.trim() && userName.toLowerCase()!=user.userName){
    //     return res.status(404).json({message:"not mactching email and username"})
    // }

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
        secure:false
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
        secure: false
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


const changecoverImage=async (req,res)=>{

    const user=req.user;
    if(user.coverImage!=""){
        await deleteonCloudnery(user.coverImage)
    }
    let newcoverImageUrl="";
    const filepath=req.file?.path
    
    if(filepath){
        const coverImage=await uploadonCloudnery(filepath);
        newcoverImageUrl=coverImage.secure_url;
    }

    user.coverImage=newcoverImageUrl;
    user.save();
    return res.status(200).json({message:"image updated successfully",coverImage:newcoverImageUrl})
}

const showExpense=async(req,res)=>{
    try {
        let {limit=10,cursor}=req.query;

        const query={userId:req.user._id};

        if(cursor){   
            query.createdAt = { $lt: new Date(cursor) };
        }
        
        
        const expenses=await Expense.find(query)
        .sort({ createdAt: -1})
        .limit(parseInt(limit))

        const nextCursor=expenses.length>0
        ?expenses[expenses.length-1].createdAt
        :null;
        
        
        return res.status(200).json({message:"fettched expense successfully",
            expenses:expenses,
            nextCursor:nextCursor,
            hasMore:expenses.length===limit
        });
    
    } catch (error) {
        
        return res.status(500).json({message:"while getting response",error:error})
    }

}

const showExpenseDateWise = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const start = new Date(startDate);
        const end = new Date(endDate);

        
        end.setHours(23, 59, 59, 999);

        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const expenses = await Expense.find({
            userId: req.user._id, 
            createdAt: { $gte: start, $lte: end }
        });

        const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);


        return res.status(200).json({
            message: "Expenses fetched successfully",
            expenses:expenses,
            totalAmount:totalAmount
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



export {registerUser,
    loginUser,
    logout,
    changePassword,
    changecoverImage,
    showExpense,
    showExpenseDateWise,
}