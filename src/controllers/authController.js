import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
//registering user
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

// login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ status: "error", message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid password" });
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: {
      user,
      token,
    },
  });
};

// update User

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, age, gender, height, weight } = req.body;

  const user = await userModel.findByIdAndUpdate(
    id,
    { name, email, password, age, gender, height, weight },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: {
      user,
    },
  });
};
