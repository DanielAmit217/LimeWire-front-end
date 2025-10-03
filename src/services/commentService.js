// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comment`;
import api from "./apiConfig";

const newComment = async (commentData) => {
  try {
    // const res = await fetch(BASE_URL, {
    //   method: "POST",
    //   body: JSON.stringify(commentData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await res.json();

    const { data } = await api.post("/comments", commentData);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getComments = async (soundId) => {
  try {
    const { data } = await api.get(`/comments?sound=${soundId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { newComment, getComments };
