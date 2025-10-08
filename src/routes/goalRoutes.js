import { Router } from "express";
import { createGoal, getGoals, updateGoalProgress } from "../controllers/goalController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const goalRouter = Router();

goalRouter.post("/", authenticate, createGoal);
goalRouter.get("/", authenticate, getGoals);
goalRouter.put("/:id", authenticate, updateGoalProgress);

export default goalRouter;