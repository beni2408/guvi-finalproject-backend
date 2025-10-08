import { Router } from "express";
import { createGoal, getGoals, updateGoalProgress, updateGoal, deleteGoal } from "../controllers/goalController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const goalRouter = Router();

goalRouter.post("/", authenticate, createGoal);
goalRouter.get("/", authenticate, getGoals);
goalRouter.put("/progress/:id", authenticate, updateGoalProgress);
goalRouter.put("/edit/:id", authenticate, updateGoal);
goalRouter.delete("/:id", authenticate, deleteGoal);

export default goalRouter;