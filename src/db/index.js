import mongoose from "mongoose";

const dataBaseName="expenseTracker"

const connectdb=async ()=>{
    try {
        console.log(process.env.MONGODB_URL)
        const database=await mongoose.connect(`${process.env.MONGODB_URL}/${dataBaseName}`);
        console.log(`data base connected successfully : ${database.connection.host}`)
    } catch (error) {
        console.log("errow while connecting database",error);
        process.exit(1);
    }
}

export default connectdb;