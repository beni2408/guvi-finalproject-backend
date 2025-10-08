import mongoose from "mongoose";

const mentalHealthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  moodRating: { type: Number, min: 1, max: 10, required: true },
  stressLevel: { type: Number, min: 1, max: 10, required: true },
  sleepHours: { type: Number, required: true },
  notes: { type: String },
  activities: [{ type: String, enum: ["meditation", "journaling", "exercise", "socializing", "reading"] }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const mentalHealthModel = mongoose.model("MentalHealth", mentalHealthSchema);

export default mentalHealthModel;