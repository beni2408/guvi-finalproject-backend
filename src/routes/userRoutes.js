import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.put("/update/:id", updateUser);
export default authRouter;
