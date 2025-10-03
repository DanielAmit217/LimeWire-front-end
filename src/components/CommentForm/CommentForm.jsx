import { useState, useContext } from "react";
import { newComment } from "../../services/commentService";
import { UserContext } from "../../context/UserContext";
import "./CommentForm.css";

const CommentForm = ({ soundId, onCommentAdded }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    comment_text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (evt) => {
    setError("");
    setSuccess("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!user) {
      setError("You must be signed in to comment");
      return;
    }

    if (!formData.comment_text.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (!soundId) {
      setError("Sound ID is required");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const commentData = {
        sound: soundId,
        comment_text: formData.comment_text.trim(),
      };

      const newCommentData = await newComment(commentData);
      
      // Reset form
      setFormData({ comment_text: "" });
      setSuccess("Comment added successfully!");
      
      // Notify parent component that a comment was added
      if (onCommentAdded) {
        onCommentAdded(newCommentData);
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {
      console.error("Error creating comment:", err);
      setError(err.response?.data?.error || err.message || "Failed to add comment");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the form if user is not authenticated
  if (!user) {
    return (
      <div className="comment-form-container">
        <p className="auth-message">Please sign in to leave a comment.</p>
      </div>
    );
  }

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="comment_text" className="form-label">
            Add a comment:
          </label>
          <textarea
            id="comment_text"
            name="comment_text"
            value={formData.comment_text}
            onChange={handleChange}
            placeholder="Write your comment here..."
            rows="4"
            className="comment-textarea"
            disabled={isLoading}
            maxLength="500"
          />
          <div className="character-count">
            {formData.comment_text.length}/500
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isLoading || !formData.comment_text.trim()}
            className="submit-button"
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
