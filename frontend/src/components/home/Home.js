import React, { useState, useEffect } from "react";
import "./Home.css";
import AddPostPopup from "../add-post-popup/AddPostPopup";
import CommentPopup from "../comment-popup/CommentPopup";

function Home() {
  const [showAddPost, setShowAddPost] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [posts, setPosts] = useState([]);

  // Fetch posts on load
  useEffect(() => {
    fetch("http://localhost:5001/api/post") // later replace with ALB DNS
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="home-container">
      <nav className="navbar">🚀 OpenForum</nav>
      <div className="actions">
        <button onClick={() => setShowAddPost(true)}>+ Add Post</button>
        <button
          onClick={() =>
            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
          }
        >
          Sort by Date ({sortOrder === "desc" ? "Latest" : "Oldest"})
        </button>
      </div>

      <div className="posts">
        {sortedPosts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p className="author">by {post.author}</p>
            <p>{post.content}</p>
            <br />
            <button onClick={() => setShowCommentPopup(post._id)}>
              View/Add Comments ({post.comments?.length || 0})
            </button>
            {showCommentPopup === post._id && (
              <div className="comments">
                {post.comments?.map((c, idx) => (
                  <p key={idx} className="comment">
                    <strong>{c.name}:</strong> {c.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddPost && (
        <AddPostPopup
          onClose={() => setShowAddPost(false)}
          onPostCreated={(newPost) =>
            setPosts((prev) => [newPost, ...prev])
          }
        />
      )}
      {showCommentPopup && (
        <CommentPopup onClose={() => setShowCommentPopup(null)} />
      )}
    </div>
  );
}

export default Home;
