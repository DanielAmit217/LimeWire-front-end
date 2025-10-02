// import { UserContext } from "../context/UserContext";
import api from "./apiConfig";
// import { useContext } from "react";

const index = async () => {
  try {
    const { data } = await api.get("/users");

    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getUser = async (userId) => {
  try {
    const { data } = await api.get(`/users/${userId}`);

    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const { data } = await api.delete(`/users/${userId}`);

    if (data.error) {
      throw new Error(data.error);
    }

    localStorage.removeItem("token");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { index, deleteUser, getUser };
