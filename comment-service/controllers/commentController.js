import Comment from "../models/Comment.js";

// Add new comment
export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ error: "postId and text are required" });
    }

    const newComment = new Comment({ postId, text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
