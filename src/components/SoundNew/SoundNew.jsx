import React from "react";
import * as commentService from "../../services/commentService.js";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function SoundNew() {
  const [formData, setFormData] = useState({
    comment: "",
  });

  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h1>SoundsNew</h1>
      <form
        action="/upload"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input type="file" />
        <input
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SoundNew;
