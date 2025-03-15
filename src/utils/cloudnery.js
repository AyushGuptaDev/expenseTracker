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

const deleteonCloudnery=async function(imageUrl){
    try {

        cloudinary.config({
            cloud_name : 'dvpilhgw9', 
            api_key : process.env.CLOUDNERY_KEY,
            api_secret : process.env.CLOUDNERY_SECRET_KEY
        })

        // Extract public ID from secure URL
        const urlParts = imageUrl.split("/");
        const publicIdWithExtension = urlParts.slice(7).join("/"); // Extract part after "upload/"
        const publicId = publicIdWithExtension.split(".")[0]; // Remove file extension

        // Delete image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Delete Result:", result);
    } catch (error) {
        console.error("Error deleting image:", error);
    }
}

export{
    uploadonCloudnery,
    deleteonCloudnery
}