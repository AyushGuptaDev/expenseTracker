import { Expense } from "../model/expense.model.js";

const addExpense=async(req,res)=>{
    const {amount,title}=req.body;

    if (isNaN(amount) || amount === "" || amount === null) {
        return res.status(404).json({message:"inavlid amount input"})
    }
    const expense=await Expense.create(
        {
            amount : amount,
            title : title,
            userId:req.user._id
        }
    )

    const createdExpense=await Expense.findById(expense._id);
    if(!createdExpense){
        return res.status(400).json({message:"error while crearing user"});
    }

    return res.status(200).json({message:"expense added successfully",expense:createdExpense});

}

const deleteExpense = async (req, res) => {
    try {
        const { expenseID } = req.body;

        
        const expense = await Expense.findById(expenseID);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        
        if (expense.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized request" });
        }

        
        await Expense.findByIdAndDelete(expenseID);

        return res.status(200)
        .json({ 
            message: "Deleted successfully" ,
            amount:expense.amount,
            title:expense.title,
            }
        );


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export{
    addExpense,
    deleteExpense
}