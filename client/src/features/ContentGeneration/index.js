// Import React and useState
import React, { useState } from "react";

// Import necessary components
import EmotionDetector from "./components/EmotionDetector";
import CategorySelector from "./components/CategorySelector";
import ContentTypeselector from "./components/ContentTypeSelector";
import ContentTypes from "./contentTypePrompts";
import Message from "./components/Message";
import { useContentLog } from "./components/ContentLogContext"; // import the context hook

// Import the API service functions
import {
  fetchYouTubeLinks,
  fetchSearchResults,
  fetchGeneratedContent,
} from "../../services/apiService";

const IntegratedComponent = () => {
  // Existing states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contentOptions, setContentOptions] = useState({});
  const [conversation, setConversation] = useState([]);
  const [emotion, setEmotion] = useState("neutral");
  const [isLoading, setIsLoading] = useState(false);
  const { updateContentLog, isContentUnique } = useContentLog();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setContentOptions(ContentTypes[category]);
  };

  const handleContentTypeselect = (prompt) => {
    if (prompt.trim() === "") return; // Ensures no empty prompts are processed
    sendMessage(prompt);
  };

  const sendMessage = async (prompt) => {
    setConversation((prev) => [{ type: "text", content: prompt }, ...prev]);
    setIsLoading(true);
    try {
      const contentResponse = await fetchGeneratedContent(prompt, emotion);
      const randomIndex = Math.floor(
        Math.random() * contentResponse.data.generatedContent.length
      );
      const randomContent = contentResponse.data.generatedContent[randomIndex];
      const youtubeResponse = await fetchYouTubeLinks(randomContent);
      const searchResponse = await fetchSearchResults(prompt, emotion);

      const uniqueVideos = youtubeResponse.data.links.filter((video) =>
        isContentUnique("video", video.url)
      );
      const uniqueLinks = searchResponse.data.links.filter((link) =>
        isContentUnique("link", link.url)
      );

      setConversation((prev) => [
        { type: "video", content: uniqueVideos },
        { type: "link", content: uniqueLinks },
        ...prev,
      ]);

      uniqueVideos.forEach((video) => updateContentLog("video", video.url));
      uniqueLinks.forEach((link) => updateContentLog("link", link.url));
    } catch (error) {
      console.error("Error fetching content:", error);
      setConversation((prev) => [
        ...prev,
        { type: "error", content: "An error occurred while fetching content." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <EmotionDetector onEmotionDetected={setEmotion} />
      <CategorySelector
        onSelectCategory={handleCategorySelect}
        categories={Object.keys(ContentTypes)}
      />
      {selectedCategory && (
        <ContentTypeselector
          onSelectContentType={handleContentTypeselect}
          contentOptions={contentOptions}
        />
      )}
      {isLoading && <div>Loading...</div>}
      <div className="chatbox-container">
        <div className="messages">
          {conversation.map((m, index) => (
            <Message key={index} message={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedComponent;
