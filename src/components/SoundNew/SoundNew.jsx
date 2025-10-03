import * as soundService from "../../services/soundService.js";
import { useState } from "react";
import "./SoundNew.css";

function SoundNew() {
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create FormData object
      const soundData = new FormData();
      soundData.append("audio", formData.file);
      soundData.append("title", formData.title);
      soundData.append("tags", JSON.stringify(formData.tags));

      // Call the service
      const result = await soundService.createSound(soundData);
      console.log("Result: ", result);

      // Reset form
      setFormData({ title: "", tags: [], file: null });

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setError(error.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      tags: checked
        ? [...prevData.tags, value]
        : prevData.tags.filter((tag) => tag !== value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("audio/")) {
      setError("Only audio files are allowed");
      return;
    }
    setFormData({ ...formData, file });
  };

  return (
    <>
      <h1>SoundsNew</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="name"
          accept="audio/*"
          onChange={handleFileChange}
          required
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Add a Title..."
        />

        <div className="tags-section">
          <h3>Tags:</h3>
          <div className="tag-checkboxes">
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="Sound Bite"
                checked={formData.tags.includes("Sound Bite")}
                onChange={handleTagChange}
              />
              Sound Bite
            </label>
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="Music"
                checked={formData.tags.includes("Music")}
                onChange={handleTagChange}
              />
              Music
            </label>
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="Foley"
                checked={formData.tags.includes("Foley")}
                onChange={handleTagChange}
              />
              Foley
            </label>
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="Sound Effect"
                checked={formData.tags.includes("Sound Effect")}
                onChange={handleTagChange}
              />
              Sound Effect
            </label>
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="Ambient"
                checked={formData.tags.includes("Ambient")}
                onChange={handleTagChange}
              />
              Ambient
            </label>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default SoundNew;
