import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({});

const nutritionModel = mongoose.model("nutrition", nutritionSchema);

export default nutritionModel;
