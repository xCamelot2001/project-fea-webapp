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
      joke: "Tell me a hilarious joke",
      story: "Share a funny anecdote or story",
      fact: "Provide an amusing fun fact",
      game: "Suggest an entertaining quick game",
      trivia: "Give me a fun trivia question",
    },
    motivation: {
      poem: "Share an inspiring poem",
      quote: "Provide a powerful motivational quote",
      biography: "Tell me about a remarkable person's life story",
      advice: "Give me some life-changing advice",
      challenge: "Propose a small motivational challenge",
    },
    comfort: {
      supportiveMessage: "I need uplifting words of comfort",
      meditation: "Guide me through a relaxing meditation session",
      music: "Recommend soothing music for relaxation",
      story: "Tell me a comforting story",
      advice: "Provide some calming advice",
    },
    education: {
      tutorial: "Show me a tutorial on a fascinating topic",
      fact: "Tell me an intriguing educational fact",
      history: "Share an interesting historical event",
      science: "Explain a fascinating science concept",
      technology: "Describe a recent breakthrough in technology",
    },
    lifestyle: {
      fitness: "Suggest a quick fitness routine",
      nutrition: "Give me a healthy nutrition tip",
      wellness: "Share a wellness activity or idea",
      fashion: "Provide a current fashion trend",
      travel: "Recommend a must-visit travel destination",
    },
    entertainment: {
      movie: "Suggest a must-watch movie",
      book: "Recommend a compelling book to read",
      show: "Propose an engaging TV show or series",
      event: "Inform me about an upcoming entertainment event",
      celebrity: "Tell me an interesting fact about a celebrity",
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
