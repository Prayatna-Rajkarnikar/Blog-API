import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostModel",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const commentModel = mongoose.model("CommentModel", commentSchema);

export default commentModel;
