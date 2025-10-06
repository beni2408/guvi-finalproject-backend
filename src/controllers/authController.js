import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, age, gender, height, weight, preferences } =
    req.body;

  //   const parsedHeight = typeof height === 'string' ? parseFloat(height) : height;
  //   const parsedWeight = typeof weight === 'string' ? parseFloat(weight) : weight;

  const user = await userModel.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ status: "error", message: "User already exists" });
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
    age,
    gender,
    height,
    weight,
    preferences,
  });
  const token = generateToken({ id: newUser._id, role: newUser.role });
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: newUser,
      token,
    },
  });
};
