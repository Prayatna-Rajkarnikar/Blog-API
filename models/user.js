import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["author", "user"],
    default: "user",
    required: true,
  },
});

const userModel = mongoose.model("UserModel", userSchema);

export default userModel;
