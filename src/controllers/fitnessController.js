import fitnessModel from "../models/fitnessModel.js";
import sendEmail from "../utils/sendEmail.js";
import userModel from "../models/userModel.js";

// Log new fitness activity
export const logFitness = async (req, res) => {
  const {
    activity,
    caloriesBurned,
    duration,
    distance,
  } = req.body;

  const newActivity = await fitnessModel.create({
    activity,
    caloriesBurned,
    duration,
    distance,
    userId: req.user._id,
  });

  sendEmail({
    to: req.user.email,
    subject: "🏋️ Fitness Activity Logged Successfully!",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f0f8ff; padding: 30px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 15px; box-shadow: 0 6px 12px rgba(0,0,0,0.15);">
          <h1 style="color: #2e8b57; margin-bottom: 20px;">Great Job, ${
            req.user.name
          }! 💪</h1>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="margin: 0; font-size: 24px;">Activity Summary</h2>
          </div>
          
          <div style="text-align: left; background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 8px 0; font-size: 16px;"><strong>🏃 Activity:</strong> ${activity}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>🔥 Calories Burned:</strong> ${caloriesBurned} kcal</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>⏱️ Duration:</strong> ${duration} minutes</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>📏 Distance:</strong> ${distance} km</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color:rgb(126, 26, 26); font-size: 16px; margin: 0;">🎯 Keep up the amazing work! Every step counts towards your fitness goals.</p>
          </div>

          <a href="https://your-app-link.com/dashboard" 
             style="display: inline-block; padding: 15px 30px; margin: 20px 0; font-size: 16px; color: #fff; background: linear-gradient(45deg,rgb(139, 46, 46),rgb(205, 50, 50)); border-radius: 25px; text-decoration: none; box-shadow: 0 4px 8px rgb(255, 255, 255);">
            View Dashboard 📊
          </a>

          <p style="font-size: 14px; color: #666; margin-top: 30px;">Stay motivated and keep tracking!<br><strong>Team Jascar's Health & Wellness</strong> 🌟</p>
        </div>
      </div>
    `,
  });

  res.status(201).json({
    status: "success",
    message: "Fitness activity logged successfully",
    data: {
      activity: newActivity,
    },
  });
};

// Get user's fitness history
export const getFitnessHistory = async (req, res) => {
  const activities = await fitnessModel
    .find({ userId: req.user._id })
    .sort({ date: -1 });

  res.status(200).json({
    status: "success",
    data: {
      activities,
      totalActivities: activities.length,
    },
  });
};

// Get fitness stats
export const getFitnessStats = async (req, res) => {
  const activities = await fitnessModel.find({ userId: req.user._id });

  const totalCalories = activities.reduce(
    (sum, activity) => sum + activity.caloriesBurned,
    0
  );
  const totalDuration = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );
  const totalDistance = activities.reduce(
    (sum, activity) => sum + activity.distance,
    0
  );

  res.status(200).json({
    status: "success",
    data: {
      totalActivities: activities.length,
      totalCalories,
      totalDuration,
      totalDistance,
    },
  });
};

// Update fitness activity
export const updateFitness = async (req, res) => {
  const { id } = req.params;
  const { activity, caloriesBurned, duration, distance } = req.body;

  const updatedActivity = await fitnessModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { activity, caloriesBurned, duration, distance },
    { new: true }
  );

  if (!updatedActivity) {
    return res.status(404).json({
      status: "error",
      message: "Activity not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Activity updated successfully",
    data: { activity: updatedActivity }
  });
};

// Delete fitness activity
export const deleteFitness = async (req, res) => {
  const { id } = req.params;

  const deletedActivity = await fitnessModel.findOneAndDelete({
    _id: id,
    userId: req.user._id
  });

  if (!deletedActivity) {
    return res.status(404).json({
      status: "error",
      message: "Activity not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Activity deleted successfully"
  });
};
