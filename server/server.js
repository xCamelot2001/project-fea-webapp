import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI with the API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define route handlers for chat
app.post('/api/chat', async (req, res) => {
  const { prompt, emotion } = req.body;
  
  // Ensure prompt and emotion are present
  if (!prompt || !emotion) {
    return res.status(400).json({ message: 'Prompt and emotion are required.' });
  }

  try {
    const messages = [{ role: 'user', content: `I feel ${emotion}. ${prompt}` }];
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      max_tokens: 1500,
    });
    res.json({ generatedContent: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ message: 'Error generating content', error: error.message });
  }
});

// Define route handlers for YouTube
app.post('/api/youtube', async (req, res) => {
  const { emotion } = req.body;

  try {
    const searchQuery = `videos for ${emotion}`;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
      }
    });
    const videoLinks = response.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);
    res.json({ links: videoLinks });
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({ message: 'Error fetching video links', error: error.message });
  }
});

// Define route handlers for Google Search
app.post('/api/search', async (req, res) => {
  const { emotion } = req.body;

  try {
    const searchQuery = `articles about ${emotion}`;
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        q: searchQuery,
        cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
        key: process.env.GOOGLE_SEARCH_API_KEY
      }
    });
    const searchLinks = response.data.items.map(item => item.link);
    res.json({ links: searchLinks });
  } catch (error) {
    console.error('Google Search API Error:', error);
    res.status(500).json({ message: 'Error fetching search results', error: error.message });
  }
});

// Define a route handler for the root path
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
