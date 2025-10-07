const { default: mongoose } = require("mongoose");

const fitnessSchema = new mongoose.Schema({});

const fitnessModel = mongoose.model("fitness", fitnessSchema);

export default fitnessModel;
