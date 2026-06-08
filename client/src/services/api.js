import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const loginUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const fetchMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
