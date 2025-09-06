import React from "react";
import "./CommentPopup.css";

function CommentPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add Comment</h2>
        <input type="text" placeholder="Your Name" />
        <textarea placeholder="Write your comment"></textarea>
        <div className="popup-actions">
          <button onClick={onClose}>Cancel</button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CommentPopup;
