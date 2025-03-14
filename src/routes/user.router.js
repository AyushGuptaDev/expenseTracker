import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser, loginUser} from "../controller/user.controller.js";
const router=Router();

//router
router.post("/signup",upload.single("coverImage"),registerUser);
router.post("/login",loginUser);


export default router;