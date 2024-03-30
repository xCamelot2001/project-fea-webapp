import React, { useState } from "react";
import EmotionDetector from "./components/EmotionDetector";
import CategorySelector from "./components/CategorySelector";
import ContentTypeSelector from "./components/ContentTypeSelector";
import Message from "./components/Message";
import InputArea from "./components/InputArea";
import {
  fetchYouTubeLinks,
  fetchSearchResults,
  fetchGeneratedContent,
} from "../../services/apiService";

const IntegratedComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contentOptions, setContentOptions] = useState({});
  const [conversation, setConversation] = useState([]);
  const [emotion, setEmotion] = useState("neutral");

  const contentTypes = {
    fun: {
      joke: "Tell me a joke",
      story: "Tell me a funny story",
      fact: "Give me a fun fact",
    },
    motivation: {
      poem: "Inspire me with a poem",
      quote: "Give me a motivational quote",
      biography: "Tell me about someone inspiring",
    },
    comfort: {
      supportiveMessage: "I need some words of comfort",
      meditation: "Guide me through a short meditation",
      music: "Suggest calming music",
    },
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setContentOptions(contentTypes[category]);
  };

  const handleContentTypeSelect = (prompt) => {
    sendMessage(prompt);
  };

  const sendMessage = async (prompt) => {
    if (prompt.trim() === "") return;

    setConversation((prev) => [...prev, { type: "text", content: prompt }]);

    try {
      const youtubeResponse = await fetchYouTubeLinks(prompt, emotion);
      const searchResponse = await fetchSearchResults(prompt, emotion);
      const contentResponse = await fetchGeneratedContent(prompt, emotion);

      setConversation((prev) => [
        ...prev,
        { type: "video", content: youtubeResponse.data.links },
        { type: "link", content: searchResponse.data.links },
        { type: "generated", content: contentResponse.data.generatedContent },
      ]);
    } catch (error) {
      console.error("Error fetching content:", error);
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
        categories={Object.keys(contentTypes)}
      />
      {selectedCategory && (
        <ContentTypeSelector
          onSelectContentType={handleContentTypeSelect}
          contentOptions={contentOptions}
        />
      )}
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
