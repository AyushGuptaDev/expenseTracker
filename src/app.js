import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js"



const app=express();


app.use(cookieParser());
app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true,limit:"10kb"}))
app.use("/user",userRouter);

export default app;