import { Router } from "express";
import { logFood, getNutritionHistory, getNutritionStats, updateFood, deleteFood } from "../controllers/nutritionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const nutritionRouter = Router();

nutritionRouter.post("/food", authenticate, logFood);
nutritionRouter.get("/history", authenticate, getNutritionHistory);
nutritionRouter.get("/stats", authenticate, getNutritionStats);
nutritionRouter.put("/food/:id", authenticate, updateFood);
nutritionRouter.delete("/food/:id", authenticate, deleteFood);

export default nutritionRouter;