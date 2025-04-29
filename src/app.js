import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js"
import expenserouter from "./routes/expense.router.js";
import cors from "cors";


const app=express();


app.use(cookieParser());
app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true,limit:"10kb"}));
app.use(cors());
app.use("/user",userRouter);
app.use("/user/expense",expenserouter)

export default app;