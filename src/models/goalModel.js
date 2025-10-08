import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["fitness", "nutrition", "mental"], required: true },
  title: { type: String, required: true },
  target: { type: Number, required: true },
  current: { type: Number, default: 0 },
  unit: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["active", "completed", "paused"], default: "active" }
}, { timestamps: true });

const goalModel = mongoose.model("Goal", goalSchema);

export default goalModel;