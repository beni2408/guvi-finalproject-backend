import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
  mealType: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"], required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const nutritionModel = mongoose.model("nutrition", nutritionSchema);

export default nutritionModel;
