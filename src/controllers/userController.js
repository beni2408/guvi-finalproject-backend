import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
//registering user
export const registerUser = async (req, res) => {
  const { name, email, password, age, gender, height, weight, preferences } =
    req.body;

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
  const token = generateToken({ id: newUser._id });

  sendEmail({
    to: email,
    subject: " 🎉 Welcome to Jascar Health & Wellness",
    text: `Hi ${name},\n\nYour account has been created successfully.\n\nBest regards,\nJascar Health & Wellness Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Welcome, ${name}!</h2>
        <p>Your account on Jascar Health & Wellness has been created successfully.</p>
        <p>You can now log in to access your personalized health and wellness dashboard.</p>
        <p>Best regards,<br>Jascar Health & Wellness Team</p>
      </div>
    `,
  });

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

  const token = generateToken({ id: user._id });
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
