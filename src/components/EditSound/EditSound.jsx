import { useState, useEffect, useContext } from "react";
import { updateSound, getSoundById } from "../../services/soundService";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

function EditSound() {
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    file: null,
    audioUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);
  const { soundId } = useParams();
  const navigate = useNavigate();

  const fetchSound = async () => {
    const soundData = await getSoundById(soundId);
    setFormData({
      title: soundData.title || "",
      tags: soundData.tags || [],
      file: null,
      audioUrl: `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds/stream/${
        soundData.fileId
      }`,
    });
    // console.log("This is the SoundData", soundData);
  };

  // TBU - need to update to handle multiple types of input tags
  const handleTagChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((tag) => tag !== value),
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateSound(soundId, formData);

    // console.log("This is the sound", soundId);
    // console.log("This is the formData", formData.file);
    navigate(`/users/${user._id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("audio/")) {
      console.error("Only audio files are allowed");
      return;
    }
    setFormData({ ...formData, file, audioUrl: URL.createObjectURL(file) });
  };

  useEffect(() => {
    fetchSound();
  }, []);

  useEffect(() => {
    if (isEditing) {
      navigate(`/users/${user._id}`);
    }
  }, [isEditing, navigate, user]);

  return (
    <div>
      <>
        {!isEditing ? (
          <>
            <h1>Edit Sound</h1>
            <AudioPlayer src={formData.audioUrl} />
            <form encType="multipart/form-data" onSubmit={handleEdit}>
              <input
                type="file"
                name="name"
                accept="audio/*"
                // value?
                onChange={handleFileChange}
                // required
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <div className="tags-section">
                <h3>Tags:</h3>
                <div className="tag-checkboxes">
                  {[
                    "soundBite",
                    "music",
                    "foley",
                    "soundEffect",
                    "Ambient",
                  ].map((tag) => (
                    <label key={tag} className="tag-checkbox">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={formData.tags.includes(tag)}
                        onChange={handleTagChange}
                      />
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit">save</button>
            </form>

            <button
              onClick={() =>
                setIsEditing((prevIsEditState) => !prevIsEditState)
              }
            >
              {isEditing ? "Edit Sound" : "Cancel Edit"}
            </button>
          </>
        ) : null}
      </>
    </div>
  );
}

export default EditSound;
