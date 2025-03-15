import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"

const verfyjwt= async (req,res,next)=>{

    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            return res.status(401).json({message:"unothorised request"})
        };
        
        
        const decodedtoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user=await User.findById(decodedtoken._id).select("-password -refreshToken");
        req.user=user;
        next();
    } catch (error) {
        console.log("error while geting token",error);
        return res.status(401).json({message:"not able to token excess"});
    }
    
}

export {verfyjwt}