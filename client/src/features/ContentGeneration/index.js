// Import React and useState
import React, { useState } from "react";

// Import necessary components
import EmotionDetector from "./components/EmotionDetector";
import CategorySelector from "./components/CategorySelector";
import ContentTypeselector from "./components/ContentTypeSelector";
import ContentTypes from "./contentTypePrompts";
import Message from "./components/Message";
import InputArea from "./components/InputArea";
import { useContentLog } from "./components/ContentLogContext"; // import the context hook

// Import the API service functions
import {
  fetchYouTubeLinks,
  fetchSearchResults,
  fetchGeneratedContent,
} from "../../services/apiService";

const IntegratedComponent = () => {
  // Existing states
  const [userInput, setUserInput] = useState("");
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
    sendMessage(prompt);
  };

  const sendMessage = async (prompt) => {
    if (prompt.trim() === "") return;

    setConversation((prev) => [{ type: "text", content: prompt }, ...prev, ]);
    console.log(conversation)
    setIsLoading(true);

    try {
      const contentResponse = await fetchGeneratedContent(prompt, emotion);
      const parsedContentResponse = contentResponse.data;

      // Generate a random index based on the length of the generatedContent array
      const randomIndex = Math.floor(
        Math.random() * parsedContentResponse.generatedContent.length
      );
      const randomContent = parsedContentResponse.generatedContent[randomIndex];
      const youtubeResponse = await fetchYouTubeLinks(randomContent);
      const searchResponse = await fetchSearchResults(prompt, emotion);

      // Before adding to the conversation, check if content is unique
      const uniqueVideos = youtubeResponse.data.links.filter((video) =>
        isContentUnique("video", video.url)
      );
      const uniqueLinks = searchResponse.data.links.filter((article) =>
        isContentUnique("link", article.url)
      );
      // const uniqueGeneratedContent = isContentUnique('generated', contentResponse.data.generatedContent)
      //   ? contentResponse.data.generatedContent
      //   : "I've told you all I know about this!";

      setConversation((prev) => [
        { type: "video", content: youtubeResponse.data.links },
        { type: "link", content: searchResponse.data.links },
        ...prev,
        // { type: "generated", content: contentResponse.data.generatedContent },
      ]);

      // Update the log
      uniqueVideos.forEach((video) => updateContentLog("video", video.url));
      uniqueLinks.forEach((link) => updateContentLog("link", link.url));
      updateContentLog("generated", "I've told you all I know about this!");

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      setIsLoading(false);
      setConversation((prev) => [
        ...prev,
        { type: "error", content: "An error occurred while fetching content." },
      ]);
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
        <InputArea
          userInput={userInput}
          setUserInput={setUserInput}
          sendMessage={() => sendMessage(userInput)}
        />
      </div>
    </div>
  );
};

export default IntegratedComponent;
