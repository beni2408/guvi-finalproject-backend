import mongoose from "mongoose";

import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    height: Number,
    weight: Number,
    preferences: String,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS));
  next();
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
