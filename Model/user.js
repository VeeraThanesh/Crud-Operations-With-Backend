import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model("Users", userSchema);
