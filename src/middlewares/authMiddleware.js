import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};
