import { Router } from "express";
import { logMentalHealth, getMentalHealthHistory, getMentalHealthStats, updateMentalHealth, deleteMentalHealth } from "../controllers/mentalHealthController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const mentalHealthRouter = Router();

mentalHealthRouter.post("/log", authenticate, logMentalHealth);
mentalHealthRouter.get("/history", authenticate, getMentalHealthHistory);
mentalHealthRouter.get("/stats", authenticate, getMentalHealthStats);
mentalHealthRouter.put("/entry/:id", authenticate, updateMentalHealth);
mentalHealthRouter.delete("/entry/:id", authenticate, deleteMentalHealth);

export default mentalHealthRouter;