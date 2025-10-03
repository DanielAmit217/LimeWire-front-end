import api from "./apiConfig";

const newComment = async (commentData) => {
  try {
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
