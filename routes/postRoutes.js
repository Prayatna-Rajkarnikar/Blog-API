import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import {
  authMiddleware,
  authorMiddleware,
} from "../middleware/authMiddleware.js";

const router = Router();
router.post("/createPost", authMiddleware, createPost);
router.put("/updatePost", authMiddleware, authorMiddleware, updatePost);
router.delete("/deletePost", authMiddleware, authorMiddleware, deletePost);

export default router;
