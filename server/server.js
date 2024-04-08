import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/suggest-content", async (req, res) => {
  const { emotion } = req.body;

  if (!emotion) {
    return res.status(400).json({ message: "Emotion is required." });
  }

  try {
    const messages = [
      { role: "user", content: `I am feeling ${emotion}. What should I watch or read?` },
    ];
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      max_tokens: 500,
    });

    const output = completion.choices[0].message.content;

    // Assuming GPT-3 returns content categories in a list format
    const categories = output.match(/\*\*(.*?)\*\*/g).map(match => match.replace(/\*\*/g, '').trim());
    res.json({ categories: categories });
  } catch (error) {
    console.error("Error fetching content categories:", error);
    res.status(500).json({ message: "Error fetching content categories", error: error.message });
  }
});

app.post("/api/fetch-category-content", async (req, res) => {
  const { emotion, category } = req.body;

  if (!emotion || !category) {
    return res.status(400).json({ message: "Both emotion and category are required." });
  }

  try {
    const youtubeContent = await fetchYouTubeContent(category);
    const googleContent = await fetchGoogleContent(category);

    res.json({
      youtube: youtubeContent,
      google: googleContent,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Error fetching content", error: error.message });
  }
});

const fetchYouTubeContent = async (query) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 5,
      key: process.env.YOUTUBE_API_KEY,
    },
  });
  
  return response.data.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
  }));
};

const fetchGoogleContent = async (query) => {
  const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      q: query,
      cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
      key: process.env.GOOGLE_SEARCH_API_KEY,
    },
  });

  return response.data.items.map(item => ({
    title: item.title,
    snippet: item.snippet,
    link: item.link,
  }));
};

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
