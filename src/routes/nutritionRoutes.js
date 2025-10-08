import { Router } from "express";
import { logFood, getNutritionHistory, getNutritionStats } from "../controllers/nutritionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const nutritionRouter = Router();

nutritionRouter.post("/food", authenticate, logFood);
nutritionRouter.get("/history", authenticate, getNutritionHistory);
nutritionRouter.get("/stats", authenticate, getNutritionStats);

export default nutritionRouter;