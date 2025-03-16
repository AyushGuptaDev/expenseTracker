import { Router } from "express";
import { verfyjwt } from "../middleware/auth.middleware.js";
import { addExpense ,deleteExpense} from "../controller/expense.controller.js";

const router=Router();

router.post("/addExpense",verfyjwt,addExpense);
router.post("/deleteExpense",verfyjwt,deleteExpense)

export default router;