import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./AudioPlayer.css";
import { Link } from "react-router";
// import { getUser } from "../../services/userService";

const AudioPlayer = ({
  src,
  title,
  username,
  onPlay,
  onPause,
  onEnded,
  userId,
  soundId,
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e) => {
    setError("Failed to load audio file");
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  const handlePlay = (e) => {
    setIsLoading(false); // Ensure loading is cleared when playing
    if (onPlay) onPlay(e);
  };

  const handlePause = (e) => {
    if (onPause) onPause(e);
  };

  const handleEnded = (e) => {
    if (onEnded) onEnded(e);
  };

  const handleLoadedMetadata = (e) => {
    const audio = e.target;
    if (audio.duration && !isNaN(audio.duration)) {
      setIsLoading(false);
      setError(null);
    }
  };

  if (!src) {
    return (
      <div className="audio-player-container">
        <div className="audio-error">
          <p>No audio source provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-player-container">
      {title && (
        <div className="audio-info">
          <div className="left-audio-title">
            <Link to={`/sounds/:${soundId}`}>
              <p>{title}</p>
            </Link>
          </div>
          <div className="right-audio-user">
            {username && (
              <Link to={`/users/${userId}`} className="audio-artist">
                By: {username}
              </Link>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="audio-error">
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        </div>
      )}

      {isLoading && !error && (
        <div className="audio-loading">
          <p style={{ color: "#666", fontSize: "14px" }}>Loading audio...</p>
        </div>
      )}

      <ReactAudioPlayer
        src={src}
        controls
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onLoadedMetadata={handleLoadedMetadata}
        className="react-audio-player"
      />
    </div>
  );
};

export default AudioPlayer;
