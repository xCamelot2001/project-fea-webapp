import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";

dotenv.config();

// Create an Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize OpenAI with the API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define route handlers for chat
app.post("/api/chat", async (req, res) => {
  const { prompt, emotion } = req.body;

  // Ensure prompt and emotion are present
  if (!prompt || !emotion) {
    return res
      .status(400)
      .json({ message: "Prompt and emotion are required." });
  }

  try {
    const messages = [
      { role: "user", content: `I feel ${emotion} . give me some youtube video title searches that will ${prompt} based on my emotion in an json array format with no extra explanation just youtube video searches` },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      max_tokens: 1500,
    });

    const gptRes = completion.choices[0].message.content;

    const cleanedResponse = gptRes.replace(/```json\n|```/g, '').trim();

    const titlesArray = JSON.parse(cleanedResponse);


    res.json({ generatedContent: titlesArray });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res
      .status(500)
      .json({ message: "Error generating content", error: error.message });
  }
});

// Define route handlers for YouTube
app.post("/api/youtube", async (req, res) => {
  const { searchParams } = req.body;

  try {
    // Use both prompt and emotion for the search query
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: searchParams,
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );
    const videoLinks = response.data.items.map(item => {
      return {
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url // 'default' can be replaced with 'medium' or 'high' for larger images
      };
    });
    res.json({ links: videoLinks });
  } catch (error) {
    console.error("YouTube API Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching video links", error: error.message });
  }
});

// Define route handlers for Google Search
app.post("/api/search", async (req, res) => {
  const { prompt, emotion } = req.body;

  try {
    // Use both prompt and emotion for the search query
    const searchQuery = `${prompt} articles about ${emotion}`;
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          q: searchQuery,
          cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
          key: process.env.GOOGLE_SEARCH_API_KEY,
        },
      }
    );
    const searchLinks = response.data.items.map(item => {
      return {
        url: item.link,
        title: item.title
      };
    });
    res.json({ links: searchLinks });
  } catch (error) {
    console.error("Google Search API Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching search results", error: error.message });
  }
});

// Define a schema for the survey
app.post('/api/survey', async (req, res) => {
  const { answers } = req.body;
  // Create a new survey response using your Mongoose model
  const newSurveyResponse = new SurveyResponse({
    question1: answers.question1,
    question2: answers.question2,
    feedback: answers.feedback
  });
  try {
    await newSurveyResponse.save();
    res.status(201).send('Survey response saved successfully');
  } catch (error) {
    res.status(500).send('Error saving survey response');
  }
});

// Define SurveyResponse model
const SurveyResponse = mongoose.model('SurveyResponse', {
  question1: String,
  question2: String,
  feedback: String
});

// Define a route handler for the root path
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
