import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { postId, text, name } = req.body;
    const comment = new Comment({ postId, text, name });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error creating comment", error: err });
  }
};

// Get all comments for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err });
  }
};

export const getCommentCount = async (req, res) => {
  try {
    const { postId } = req.params;
    const count = await Comment.countDocuments({ postId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comment count" });
  }
};
