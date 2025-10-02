const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/sounds`;

const createSound = async (soundData) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: soundData, // FormData object
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating sound:', error);
    throw error;
  }
};

const getAllSounds = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching sounds:', error);
    throw error;
  }
};

const getSoundById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching sound:', error);
    throw error;
  }
};

export { createSound, getAllSounds, getSoundById };