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
    console.error("Error in getComments:", error);
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { newComment, getComments, deleteComment };
