import { Router } from "express";
import { logFitness, getFitnessHistory, getFitnessStats } from "../controllers/fitnessController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const fitnessRouter = Router();

fitnessRouter.post("/activity", authenticate, logFitness);
fitnessRouter.get("/history", authenticate, getFitnessHistory);
fitnessRouter.get("/stats", authenticate, getFitnessStats);
export default fitnessRouter;
