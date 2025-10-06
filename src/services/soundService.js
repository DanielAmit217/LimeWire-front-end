const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds`;

import api from "./apiConfig";

const createSound = async (soundData) => {
  try {
    const { data } = await api.post("/sounds", soundData);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getAllSounds = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching sounds:", error);
    throw error;
  }
};

const getSoundById = async (soundId) => {
  try {
    const { data } = await api.get(`/sounds/${soundId}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const deleteSound = async (soundId) => {
  try {
    const { data } = await api.delete(`/sounds/${soundId}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const updateSound = async (soundId, updateData) => {
  try {
    const { data } = await api.put(`/sounds/${soundId}`, updateData);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getStreamUrl = (id) => `${BASE_URL}/${id}/stream`;

export {
  createSound,
  getAllSounds,
  getSoundById,
  getStreamUrl,
  deleteSound,
  updateSound,
};
