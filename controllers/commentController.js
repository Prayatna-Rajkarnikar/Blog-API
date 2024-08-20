import CommentModel from "../models/comment.js";
import postModel from "../models/post.js";

export const addComment = async (req, res) => {
  try {
    const { post, content } = req.body;

    const postExist = await postModel.findById(post);
    if (!postExist) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new CommentModel({
      post,
      author: req.user.id,
      content,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};
