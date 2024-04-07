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
    // Get a content suggestion prompt from OpenAI based on the user's emotion
    const messages = [
      { role: "user", content: `Create a content suggestion to entertain someone who is feeling ${emotion}` },
    ];
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      max_tokens: 500,
    });

    const contentSuggestion = completion.choices[0].message.content;
    console.log("Content Suggestion:", contentSuggestion);
    // Use the content suggestion to search for videos
    const videoResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet",
          q: contentSuggestion,
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videos = videoResponse.data.items.map(item => ({
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    // Use the content suggestion to search for articles
    const articleResponse = await axios.get(
      `https://www.googleapis.com/customsearch/v1`, {
        params: {
          q: contentSuggestion,
          cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
          key: process.env.GOOGLE_SEARCH_API_KEY,
        },
      }
    );

    const articles = articleResponse.data.items.map(item => ({
      url: item.link,
      title: item.title
    }));

    // Return the content suggestion and the results from the YouTube and Google Search APIs
    res.json({
      contentSuggestion: contentSuggestion,
      videos: videos,
      articles: articles,
    });
  } catch (error) {
    console.error("Error fetching content suggestions:", error);
    res.status(500).json({ message: "Error fetching content suggestions", error: error.message });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
