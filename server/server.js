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

// Helper function to fetch YouTube links
async function fetchYouTubeLinks(emotion) {
  const searchQuery = `entertaining videos for someone feeling ${emotion}`;
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      part: "snippet",
      q: searchQuery,
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
    },
  });
  return response.data.items.map(item => ({
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}

// Helper function to fetch Google search links
async function fetchSearchLinks(emotion) {
  const searchQuery = `articles for someone feeling ${emotion}`;
  const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
    params: {
      q: searchQuery,
      cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
      key: process.env.GOOGLE_SEARCH_API_KEY,
    },
  });
  return response.data.items.map(item => ({
    url: item.link,
    title: item.title,
  }));
}

// Endpoint to suggest and fetch/generate content
app.post("/api/suggest-content", async (req, res) => {
  const { emotion } = req.body;

  // Ensure emotion is present
  if (!emotion) {
    return res.status(400).json({ message: "Emotion is required." });
  }

  try {
    // Generate a content suggestion based on emotion using OpenAI
    const prompt =[{ role:'user', content: `What kind of content would entertain someone who is feeling ${emotion}?` }];
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: prompt,
      max_tokens: 1500,
    });

    const contentSuggestion = openaiResponse.choices[0].content;

    // Fetch content from YouTube and Google based on the OpenAI suggestion
    const videoLinks = await fetchYouTubeLinks(contentSuggestion);
    const searchLinks = await fetchSearchLinks(contentSuggestion);

    // Use the suggestion to generate more specific content using OpenAI
    const contentPrompt = [{ role:'user', content:`Create content that would entertain someone who is feeling ${emotion} and interested in ${contentSuggestion}` }];
    const contentResponse = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: contentPrompt,
      max_tokens: 1500,
    });

    const generatedContent = contentResponse.choices[0].content;

    // Respond with all fetched and generated content
    res.json({
      suggestion: contentSuggestion,
      videos: videoLinks,
      articles: searchLinks,
      generatedContent: generatedContent,
    });
  } catch (error) {
    console.error("Error in content suggestion:", error);
    res.status(500).json({ message: "Error processing content suggestion", error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
