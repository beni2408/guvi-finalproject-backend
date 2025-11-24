import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/userRoutes.js";
import fitnessRouter from "./src/routes/fitnessRoutes.js";
import nutritionRouter from "./src/routes/nutritionRoutes.js";
import goalRouter from "./src/routes/goalRoutes.js";
import mentalHealthRouter from "./src/routes/mentalHealthRoutes.js";

dotenv.config();

const app = express();
app.use(cors()); // Allow all origins (for development)

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Jascar Health & Wellness API is running!",
    status: "success",
    endpoints: {
      auth: "/api/auth",
      fitness: "/api/fitness",
      nutrition: "/api/nutrition",
      goals: "/api/goals",
      mentalHealth: "/api/mental-health",
    },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/fitness", fitnessRouter);
app.use("/api/nutrition", nutritionRouter);
app.use("/api/goals", goalRouter);
app.use("/api/mental-health", mentalHealthRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
