// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
  activity: {
    enum: ["running", "cycling", "swimming", "yoga", "weightlifting", "other"],
    type: String,
    required: true,
  },
  caloriesBurned: { type: Number, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const fitnessModel = mongoose.model("activity", fitnessSchema);

export default fitnessModel;
