import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
//registering user
export const registerUser = async (req, res) => {
  const { name, email, password, age, gender, height, weight, mobile, preferences } =
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
    mobile,
  });
  const token = generateToken({ id: newUser._id });

  sendEmail({
    to: email,
    subject: "Account Created - Jascar Health Platform",
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

// forgot password - send OTP to mobile
export const forgotPassword = async (req, res) => {
  try {
    const { mobile } = req.body;
    
    // Check if user exists
    const user = await userModel.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ 
        status: "error", 
        message: "User not found with this mobile number" 
      });
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP and expiry (5 minutes)
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
    
    // In production, send SMS using Twilio/AWS SNS
    console.log(`OTP for ${mobile}: ${otp}`);
    
    res.status(200).json({
      status: "success",
      message: `OTP sent to mobile number ${mobile}. (For demo: ${otp})`
    });
    
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: "Server error" 
    });
  }
};

// verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    
    const user = await userModel.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ 
        status: "error", 
        message: "User not found" 
      });
    }
    
    // Check if OTP is valid and not expired
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ 
        status: "error", 
        message: "Invalid or expired OTP" 
      });
    }
    
    res.status(200).json({
      status: "success",
      message: "OTP verified successfully"
    });
    
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: "Server error" 
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { mobile, otp, newPassword } = req.body;
    
    const user = await userModel.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ 
        status: "error", 
        message: "User not found" 
      });
    }
    
    // Verify OTP again
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ 
        status: "error", 
        message: "Invalid or expired OTP" 
      });
    }
    
    // Update password and clear OTP
    user.password = newPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    
    res.status(200).json({
      status: "success",
      message: "Password reset successfully"
    });
    
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: "Server error" 
    });
  }
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
  const { name, email, password, age, gender, height, weight, profileImage } = req.body;

  const user = await userModel.findByIdAndUpdate(
    id,
    { name, email, password, age, gender, height, weight, profileImage },
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

// Upload profile image
export const uploadProfileImage = async (req, res) => {
  const upload = (await import('../middlewares/uploadMiddleware.js')).default;
  
  upload.single('profileImage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded"
      });
    }

    try {
      const user = await userModel.findById(req.user._id);
      user.profileImage = `/uploads/profiles/${req.file.filename}`;
      await user.save();
      
      res.status(200).json({
        status: "success",
        message: "Profile image uploaded successfully",
        data: {
          profileImage: user.profileImage
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Server error"
      });
    }
  });
};

// Delete profile image
export const deleteProfileImage = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.profileImage = null;
    await user.save();
    
    res.status(200).json({
      status: "success",
      message: "Profile image deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
};
