import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";



const uploadonCloudnery=async (localfilepath)=>{
    try {
        cloudinary.config({
            cloud_name : 'dvpilhgw9', 
            api_key : process.env.CLOUDNERY_KEY,
            api_secret : process.env.CLOUDNERY_SECRET_KEY
        })
        
        if(!localfilepath)return null;
        const response= await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"});
        fs.unlinkSync(localfilepath);
        return response;    
    } catch (error) {
        fs.unlinkSync(localfilepath);   
        console.log("error hai ya in cloudenry",error);
        return null;
    }
}

export{uploadonCloudnery}