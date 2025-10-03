import { useState, useEffect, useContext } from "react";
import { getComments, deleteComment } from "../../services/commentService";
import { UserContext } from "../../context/UserContext";
import "./CommentList.css";

const CommentList = ({ soundId, comments: initialComments, onCommentDeleted }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(initialComments || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (soundId && !initialComments) {
      fetchComments();
    } else if (initialComments) {
      setComments(initialComments);
    }
  }, [soundId, initialComments]);

  const fetchComments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getComments(soundId);
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
      
      if (onCommentDeleted) {
        onCommentDeleted(commentId);
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Failed to delete comment");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return null; // Return null so we can show a fallback
    }
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return null; // Return null so we can show a fallback
    }
    
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  if (error) {
    return <div className="comments-error">{error}</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="comments-container">
        <h3 className="comments-title">Comments</h3>
        <p className="no-comments">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comments-container">
      <h3 className="comments-title">
        Comments ({comments.length})
      </h3>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-header">
              <span className="comment-author">
                {comment.user?.username || comment.author?.username || "Anonymous User"}
              </span>
              <span className="comment-date">
                {formatDate(comment.createdAt || comment.created_at || comment.date) || "Recently"}
              </span>
              {user && comment.user && user._id === comment.user._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="delete-button"
                  aria-label="Delete comment"
                >
                  ×
                </button>
              )}
            </div>
            <div className="comment-text">
              {comment.comment_text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;