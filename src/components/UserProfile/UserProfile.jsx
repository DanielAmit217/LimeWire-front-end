import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteUser, getUser } from "../../services/userService";
import { useNavigate, useParams } from "react-router";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";

function UserProfile() {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

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
  }, [userId]);

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    deleteUser(user._id);
    setUser(null);
    navigate("/");
    console.log("Here we are", currentUser);
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  return (
    <>
      <h1>{currentUser.username || "User Profile"}</h1>
      <h2>Your sounds:</h2>

      {/* Render AudioPlayer for each sound */}
      {currentUser.sounds && currentUser.sounds.length > 0 ? (
        currentUser.sounds.map((sound, index) => {
          const audioSrc = sound.fileId
            ? `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds/stream/${
                sound.fileId
              }`
            : null;

          return (
            <AudioPlayer
              key={sound._id || index}
              src={audioSrc}
              soundId={sound._id}
              title={
                sound.title ||
                sound.name ||
                sound.filename?.replace(/^\d+-/, "").replace(/\.[^/.]+$/, "") ||
                "Unknown"
              }
              username={currentUser.username}
              userId={currentUser._id}
            />
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
    </>
  );
}

export default UserProfile;
