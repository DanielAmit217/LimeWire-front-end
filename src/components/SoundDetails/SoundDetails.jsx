import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getComments } from "../../services/commentService.js";
import { getSoundById } from "../../services/soundService.js";

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

  return (
    <>
      <h1>{sound && sound.title}</h1>
      <ul>
        {comments.map((comment) => {
          return <li key={comment._id}>{comment.comment_text}</li>;
        })}
      </ul>
    </>
  );
}

export default SoundDetails;
