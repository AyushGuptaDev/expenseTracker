import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser, loginUser,logout,changePassword,changecoverImage,showExpense,showExpenseDateWise} from "../controller/user.controller.js";
import { verfyjwt } from "../middleware/auth.middleware.js";
const router=Router();

//router
router.post("/signup",upload.single("coverImage"),registerUser);
router.post("/login",loginUser);
router.post("/logout",verfyjwt,logout);
router.post("/changePassword",verfyjwt,changePassword);
router.post("/changeCoverImage",verfyjwt,upload.single("coverImage"),changecoverImage)

//get user expense
router.get("/showExpense",verfyjwt,showExpense);
router.get("/getDateWiseExpense",verfyjwt,showExpenseDateWise);
export default router;