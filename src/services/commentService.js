const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comment`;

const newComment = async (commentData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
export { newComment };
