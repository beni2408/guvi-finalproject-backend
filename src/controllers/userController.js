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
    subject: "🎉 Welcome to Jascar's Health & Wellness!",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f0f4f8; padding: 30px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h1 style="color:rgb(166, 38, 38);">Welcome, ${name}! 👋</h1>
          <p style="font-size: 16px; color: #555;">Your account on <strong>Jascar's Health & Wellness</strong> has been created successfully.</p>
          
    
  
          <a href="https://your-login-link.com" 
             style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 16px; color: #fff; background-color: rgb(166, 38, 38); border-radius: 5px; text-decoration: none;">
            Login Now
          </a>
  
          <p style="font-size: 14px; color: #999;">Get ready to explore personalized fitness, nutrition tips, and wellness insights tailored just for you.</p>
  
          <p style="font-size: 14px; color: #555;">Cheers,<br>Team Jascar's Health & Wellness ✨</p>
        </div>
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
