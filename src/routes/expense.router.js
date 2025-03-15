import { Router } from "express";
import { verfyjwt } from "../middleware/auth.middleware.js";
import { addExpense } from "../controller/expense.controller.js";

const router=Router();

router.post("/addExpense",verfyjwt,addExpense);


export default router;