import { Router } from "express";
import { logMentalHealth, getMentalHealthHistory, getMentalHealthStats } from "../controllers/mentalHealthController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const mentalHealthRouter = Router();

mentalHealthRouter.post("/log", authenticate, logMentalHealth);
mentalHealthRouter.get("/history", authenticate, getMentalHealthHistory);
mentalHealthRouter.get("/stats", authenticate, getMentalHealthStats);

export default mentalHealthRouter;