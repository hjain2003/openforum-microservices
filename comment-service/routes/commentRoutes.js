import express from "express";
import {createComment, getCommentCount, getCommentsByPost } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment); 
router.get("/:postId", getCommentsByPost); 
router.get("/count/:postId", getCommentCount);

export default router;
