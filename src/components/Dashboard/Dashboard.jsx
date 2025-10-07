import { useEffect, useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import * as soundService from "../../services/soundService.js";
// import SoundList from "../SoundList/SoundList.jsx";
// import { Link } from "react-router";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const [sounds, setSounds] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const soundsData = await soundService.getAllSounds();
        setSounds(soundsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSounds();
  }, [user]);

  return (
    <div className="dashboard-page">
      <div className="greetin-block">
        <h1>Welcome, {user.username}</h1>
        <p>
          This is the dashboard page where you can see a list of all sounds on
          our database
        </p>
      </div>
      <div className="sound-list">
        {sounds.map((sound, index) => {
          const audioSrc = sound.fileId
            ? `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds/stream/${
                sound.fileId
              }`
            : null;

          return (
            <AudioPlayer
              key={sound._id || index}
              src={audioSrc}
              title={
                sound.title ||
                sound.name ||
                sound.filename?.replace(/^\d+-/, "").replace(/\.[^/.]+$/, "") ||
                "Unknown"
              }
              username={sound?.user?.username}
              userId={sound?.user?._id}
              soundId={sound._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
