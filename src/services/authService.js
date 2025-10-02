import api from "./apiConfig";

const signUp = async (formData) => {
  try {
    const { data } = await api.post("auth/sign-up", formData);

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error(data.error);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const signIn = async (formData) => {
  try {
    const { data } = await api.post("/auth/sign-in", formData);

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error(data.error);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { signUp, signIn };
