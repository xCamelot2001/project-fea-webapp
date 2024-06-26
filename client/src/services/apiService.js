import axios from "axios";

const API_BASE_URL = "https://expressence.studio";

// Define a function to fetch generated content from the server
export const fetchGeneratedContent = async (prompt, emotion) => {
  return axios.post(`${API_BASE_URL}/api/chat`, { prompt, emotion });
};

// Define a function to fetch YouTube links from the server
export const fetchYouTubeLinks = async (searchParams) => {
  return axios.post(`${API_BASE_URL}/api/youtube`, { searchParams });
};

// Define a function to fetch search results from the server
export const fetchSearchResults = async (prompt, emotion) => {
  return axios.post(`${API_BASE_URL}/api/search`, { prompt, emotion });
};

// Define a function to submit survey responses to the server
export const submitSurvey = async (answers, feedback) => {
  return axios.post(`${API_BASE_URL}/api/survey`, { answers, feedback });
};