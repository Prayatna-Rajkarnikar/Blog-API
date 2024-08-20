import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Technology",
      "Education",
      "LifeStyle",
      "Business & Finance",
      "Personal Development",
    ],
    required: true,
  },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model("PostModel", postSchema);

export default postModel;
