import React, { useState, useEffect } from "react";
import "./CommentPopup.css";

function CommentPopup({ postId, onClose }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
const COMMENT_API = process.env.REACT_APP_COMMENT_API;

  // Fetch comments for this post
  useEffect(() => {
    fetch(`${COMMENT_API}/api/comment/${postId}`) // comment-service
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [postId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`${COMMENT_API}/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          text,
          name,
        }),
      });

      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]); // new at top
      setText("");
      setName("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>Comments</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Show existing comments */}
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((c, idx) => (
              <div key={idx} className="comment-card">
                <div className="comment-author">{c.name || "Anonymous"}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first!</p>
          )}
        </div>

        {/* Add new comment */}
        <div className="comment-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CommentPopup;
