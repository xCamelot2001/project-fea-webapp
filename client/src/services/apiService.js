import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

// Define a function to fetch generated content from the server
export const fetchGeneratedContent = async (prompt, emotion) => {
  return axios.post(`${API_BASE_URL}/api/chat`, { prompt, emotion });
};

// Define a function to fetch YouTube links from the server
export const fetchYouTubeLinks = async (prompt, emotion) => {
  return axios.post(`${API_BASE_URL}/api/youtube`, { prompt, emotion });
};

// Define a function to fetch search results from the server
export const fetchSearchResults = async (prompt, emotion) => {
  return axios.post(`${API_BASE_URL}/api/search`, { prompt, emotion });
};
