import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addComment } from "../controllers/commentController.js";

const router = Router();
router.post("/addComment", authMiddleware, addComment);

export default router;
