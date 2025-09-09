import React, { useState, useEffect } from "react";
import "./Home.css";
import AddPostPopup from "../add-post-popup/AddPostPopup";
import CommentPopup from "../comment-popup/CommentPopup";

function Home() {
  
  const POST_API = process.env.REACT_APP_POST_API;
const COMMENT_API = process.env.REACT_APP_COMMENT_API;
  const [showAddPost, setShowAddPost] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});

  // Fetch posts on load
  useEffect(() => {
    fetch(`${POST_API}/api/post`) // later replace with ALB DNS
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);

        // fetch comment counts for each post
        data.forEach((post) => {
          fetch(`${COMMENT_API}/api/comment/count/${post._id}`)
            .then((res) => res.json())
            .then((countData) => {
              setCommentCounts((prev) => ({
                ...prev,
                [post._id]: countData.count,
              }));
            })
            .catch((err) =>
              console.error("Error fetching comment count:", err)
            );
        });
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="home-container">
      <nav className="navbar">🚀 OpenForum 1.0</nav>
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
              View/Add Comments ({commentCounts[post._id] || 0})
            </button>
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
        <CommentPopup
          postId={showCommentPopup}
          onClose={() => setShowCommentPopup(null)}
        />
      )}
    </div>
  );
}

export default Home;
