import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

// Define a function to fetch content suggestions from the server
export const fetchContentSuggestions = async (emotion) => {
  return axios.post(`${API_BASE_URL}/api/suggest-content`, { emotion });
};