import * as soundService from "../../services/soundService.js";
import { useState } from "react";
import "./SoundNew.css";

function SoundNew() {
  const [formData, setFormData] = useState({
    Title: "",
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
      soundData.append("Title", formData.Title);
      soundData.append("tags", JSON.stringify(formData.tags));

      // Call the service
      const result = await soundService.createSound(soundData);
      console.log("Result: ", result);

      // Reset form
      setFormData({ Title: "", tags: [], file: null });

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
    setFormData({ ...formData, file });
  };

  return (
    <>
      <h1>SoundsNew</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          required
        />
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Add a Title..."
        />

        <div className="tags-section">
          <h3>Tags:</h3>
          <div className="tag-checkboxes">
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="soundBite"
                checked={formData.tags.includes("soundBite")}
                onChange={handleTagChange}
              />
              Sound Bite
            </label>
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="music"
                checked={formData.tags.includes("music")}
                onChange={handleTagChange}
              />
              Music
            </label>
             <label className="tag-checkbox">
              <input
                type="checkbox"
                value="foley"
                checked={formData.tags.includes("foley")}
                onChange={handleTagChange}
              />
              Foley
            </label>
             <label className="tag-checkbox">
              <input
                type="checkbox"
                value="soundEffect"
                checked={formData.tags.includes("soundEffect")}
                onChange={handleTagChange}
              />
              Sound Effect
            </label>
            <label className="tag-checkbox">
              <input
                type="checkbox"
                value="ambient"
                checked={formData.tags.includes("ambient")}
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
