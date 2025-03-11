import dotenv from "dotenv";
dotenv.config({path:"./.env"});

import connectdb from "./db/index.js";
import app from "./app.js";

connectdb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("sever is running");
    })
}).catch((error)=>{
    console.log("sever connection failed",error);
})