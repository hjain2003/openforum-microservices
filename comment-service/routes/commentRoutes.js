import express from "express";
import { addComment, getCommentsByPost } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment); // Add a comment
router.get("/:postId", getCommentsByPost); // Fetch comments for a post

export default router;
