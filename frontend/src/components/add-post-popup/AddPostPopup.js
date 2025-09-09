import React, { useState } from "react";
import "./AddPostPopup.css";

function AddPostPopup({ onClose, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const POST_API = process.env.REACT_APP_POST_API;

  const handleSubmit = async () => {
    if (!title || !author || !content) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${POST_API}/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, content }),
      });

      const data = await res.json();
      if (res.ok) {
        onPostCreated(data); // update parent state
        onClose();
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Create a Post</h2>
        <input
          type="text"
          placeholder="Heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="popup-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPostPopup;
