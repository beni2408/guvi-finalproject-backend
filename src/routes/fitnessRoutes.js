import { Router } from "express";
import {
  logFitness,
  getFitnessHistory,
  getFitnessStats,
  updateFitness,
  deleteFitness,
} from "../controllers/fitnessController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const fitnessRouter = Router();

fitnessRouter.post("/activity", authenticate, logFitness);
fitnessRouter.get("/history", authenticate, getFitnessHistory);
fitnessRouter.get("/stats", authenticate, getFitnessStats);
fitnessRouter.put("/activity/:id", authenticate, updateFitness);
fitnessRouter.delete("/activity/:id", authenticate, deleteFitness);
export default fitnessRouter;
