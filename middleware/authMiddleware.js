import jwt from "jsonwebtoken";
import postModel from "../models/post.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(403).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const authorMiddleware = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const post = await postModel.findOne({ title, author: req.user.id });
    if (!post) {
      return res.status(404).json({
        message: "Post not found or not authorized to update this post",
      });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
