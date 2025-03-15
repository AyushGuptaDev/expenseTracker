import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema(
    {
        amount:{
            type:Number,
            required:true,
        },
        title:{
            type:String,
            required:true,
            default:"unkown expense",
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    },{timestamps:true}
);
expenseSchema.index({userId:1,createdAt:-1});


export const Expense=mongoose.model("Expense",expenseSchema);
