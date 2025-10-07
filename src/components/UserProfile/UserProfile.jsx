import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteUser, getUser } from "../../services/userService";
import { useNavigate, useParams, Link } from "react-router";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { deleteSound } from "../../services/soundService";
import "./UserProfile.css";

function UserProfile() {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getUser(userId);
        setCurrentUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId, toggle]);

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    deleteUser(user._id);
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  const handleSoundDelete = async (e, soundId) => {
    e.preventDefault();
    await deleteSound(soundId);
    setToggle((prev) => !prev);
  };

  return (
    <div className="profile-card">
      <h1>{currentUser.username || "User Profile"}</h1>
      <h2>Uploaded sounds:</h2>

      {/* Render AudioPlayer for each sound */}
      {currentUser.sounds && currentUser.sounds.length > 0 ? (
        currentUser.sounds.map((sound, index) => {
          const audioSrc = sound.fileId
            ? `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds/stream/${
                sound.fileId
              }`
            : null;

          return (
            <div key={sound._id} className="sound-card">
              <AudioPlayer
                src={audioSrc}
                title={
                  sound.title ||
                  sound.name ||
                  sound.filename
                    ?.replace(/^\d+-/, "")
                    .replace(/\.[^/.]+$/, "") ||
                  "Unknown"
                }
                artist={sound.artist || currentUser.username}
              />

              {user && currentUser._id === user._id && (
                <div className="sound-actions">
                  <form onSubmit={(e) => handleSoundDelete(e, sound._id)}>
                    <button type="submit" className="delete-btn">
                      Delete Sound
                    </button>
                  </form>

                  <Link to={`/sounds/${sound._id}/edit`}>
                    <button type="button" className="edit-btn">
                      Edit Sound
                    </button>
                  </Link>
                </div>
              )}

              {/* <div className="comment-section"> */}
              {/* <CommentForm soundId={sound._id} /> */}
              {/* <CommentList soundId={sound._id} /> */}
              {/* </div> */}
            </div>
          );
        })
      ) : (
        <p>No sounds.</p>
      )}

      {/* Check if currentUser._id === user._id */}
      {user && currentUser._id === user._id && (
        <form action="" onSubmit={handleSubmit}>
          <button type="submit">Delete User</button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;
