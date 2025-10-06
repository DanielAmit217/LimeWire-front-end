import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getComments } from "../../services/commentService.js";
import { getSoundById } from "../../services/soundService.js";
import CommentForm from "../CommentForm/CommentForm.jsx";
import CommentList from "../CommentList/CommentList.jsx";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";

function SoundDetails() {
  const { soundId } = useParams();
  const [comments, setComments] = useState([]);
  const [sound, setSound] = useState();

  useEffect(() => {
    const getSound = async () => {
      const showSound = await getSoundById(soundId);
      setSound(showSound);
    };

    const fetchComments = async () => {
      const soundComments = await getComments(soundId);
      setComments(soundComments);
    };
    fetchComments();
    getSound();
  }, []);

  const audioSrc = sound?.fileId
    ? `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds/stream/${sound.fileId}`
    : null;

  return (
    <>
      <h1>{sound && sound.title}</h1>
      {sound && (
        <AudioPlayer
          key={sound._id}
          src={audioSrc}
          soundId={sound._id}
          title={
            sound.title ||
            sound.name ||
            sound.filename?.replace(/^\d+-/, "").replace(/\.[^/.]+$/, "") ||
            "Unknown"
          }
          username={sound.user?.username}
          userId={sound.user?._id}
        />
      )}
      <div>
        <CommentForm soundId={soundId} onCommentAdded={(newComment) => setComments([...comments, newComment])} />
        <CommentList comments={comments} />
      </div>
    </>
  );
}

export default SoundDetails;
