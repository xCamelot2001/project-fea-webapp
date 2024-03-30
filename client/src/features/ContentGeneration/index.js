import React, { useState } from "react";
import {
  fetchYouTubeLinks,
  fetchSearchResults,
  fetchGeneratedContent,
} from "../../services/apiService";
import EmotionDetector from "./components/EmotionDetector";
import CategorySelector from "./components/CategorySelector";
import ContentTypeSelector from "./components/ContentTypeSelector";
import ContentDisplay from "./components/ContentDisplay";

const IntegratedComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("neutral");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contentOptions, setContentOptions] = useState({});
  const [conversation, setConversation] = useState([]);

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
    setUserInput(prompt);
    getContent(prompt, emotion);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setConversation((prev) => [...prev, { type: "text", content: userInput }]);
    setUserInput("");

    try {
      const youtubeResponse = await fetchYouTubeLinks(emotion);
      if (youtubeResponse.data.links) {
        setConversation((prev) => [
          ...prev,
          { type: "video", content: youtubeResponse.data.links },
        ]);
      } else {
        console.log("No youtube links found");
      }

      const searchResponse = await fetchSearchResults(emotion);
      if (searchResponse.data.links) {
        setConversation((prev) => [
          ...prev,
          { type: "link", content: searchResponse.data.links },
        ]);
      } else {
        console.log("No search results found");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      setConversation((prev) => [
        ...prev,
        { type: "error", content: "An error occurred while fetching content." },
      ]);
    }
  };

  const getContent = async (prompt, currentEmotion) => {
    try {
      const response = await fetchGeneratedContent(prompt, currentEmotion);
      setContent(response.data.generatedContent);
      setConversation((prev) => [
        ...prev,
        { type: "generated", content: response.data.generatedContent },
      ]);
    } catch (error) {
      console.error("Error fetching generated content:", error);
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
            <div key={index} className={`message ${m.type}`}>
              {m.type === "text" && <p>{m.content}</p>}
              {m.type === "video" &&
                m.content.map((url, idx) => (
                  <div key={idx}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      YouTube Video
                    </a>
                  </div>
                ))}
              {m.type === "link" &&
                m.content.map((url, idx) => (
                  <div key={idx}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Related Article
                    </a>
                  </div>
                ))}
              {m.type === "generated" && <ContentDisplay content={m.content} />}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default IntegratedComponent;
