import { Router } from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateUser,
  uploadProfileImage,
  deleteProfileImage,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);
authRouter.put("/update/:id", updateUser);
authRouter.post("/upload-profile-image", authenticate, uploadProfileImage);
authRouter.delete("/profile-image", authenticate, deleteProfileImage);
export default authRouter;
