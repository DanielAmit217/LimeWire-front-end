import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './AudioPlayer.css';

const AudioPlayer = ({ src, title, artist, onPlay, onPause, onEnded }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e) => {
    setError('Failed to load audio file');
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
          <h3 className="audio-title">{title}</h3>
          {artist && <p className="audio-artist">{artist}</p>}
        </div>
      )}
      
      {error && (
        <div className="audio-error">
          <p style={{color: 'red', fontSize: '14px'}}>{error}</p>
        </div>
      )}
      
      {isLoading && !error && (
        <div className="audio-loading">
          <p style={{color: '#666', fontSize: '14px'}}>Loading audio...</p>
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
        className="react-audio-player"
      />
    </div>
  );
};

export default AudioPlayer;