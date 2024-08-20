import postModel from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const newPost = new postModel({
      title,
      content,
      author: req.user.id,
      category,
      tags,
    });
    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const userId = req.user.id;

    const post = await postModel.findOne({ title, author: userId });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or not authorized to update this post",
      });
    }

    const updatedPost = await postModel.findOneAndUpdate(
      { title, author: userId },
      { content, category, tags },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found or update failed",
      });
    }

    res.status(200).json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      message: "Error updating post",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const deletedPost = await postModel.findOneAndDelete({
      title,
      author: req.user.id,
    });

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found or not authorized to delete this post",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      message: "Error deleting post",
      error: error.message,
    });
  }
};
