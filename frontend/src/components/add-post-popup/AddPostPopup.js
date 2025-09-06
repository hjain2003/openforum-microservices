import React from "react";
import "./AddPostPopup.css";

function AddPostPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Create a Post</h2>
        <input type="text" placeholder="Heading" />
        <input type="text" placeholder="Author" />
        <textarea placeholder="Content"></textarea>
        <div className="popup-actions">
          <button onClick={onClose}>Cancel</button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddPostPopup;
