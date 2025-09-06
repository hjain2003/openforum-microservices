import React, { useState } from "react";
import "./Home.css";
import AddPostPopup from "../add-post-popup/AddPostPopup";
import CommentPopup from "../comment-popup/CommentPopup";

function Home() {
  const [showAddPost, setShowAddPost] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  // Dummy posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "First Post on OpenForum",
      author: "Alice",
      content: "This is the very first post!",
      date: new Date("2023-09-01"),
      comments: [
        { id: 1, name: "Bob", text: "Nice start!" },
        { id: 2, name: "Charlie", text: "Excited for this platform." },
      ],
    },
    {
      id: 2,
      title: "Another Post",
      author: "Dave",
      content: "Loving the UI vibes.",
      date: new Date("2023-09-02"),
      comments: [],
    },
  ]);

  const sortedPosts = [...posts].sort((a, b) => {
    return sortOrder === "desc"
      ? b.date - a.date
      : a.date - b.date;
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
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p className="author">by {post.author}</p>
            <p>{post.content}</p>
            <br/>
            <button onClick={() => setShowCommentPopup(post.id)}>
              View/Add Comments ({post.comments.length})
            </button>
            {showCommentPopup === post.id && (
              <div className="comments">
                {post.comments.map((c) => (
                  <p key={c.id} className="comment">
                    <strong>{c.name}:</strong> {c.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddPost && (
        <AddPostPopup onClose={() => setShowAddPost(false)} />
      )}
      {showCommentPopup && (
        <CommentPopup
          onClose={() => setShowCommentPopup(null)}
        />
      )}
    </div>
  );
}

export default Home;
