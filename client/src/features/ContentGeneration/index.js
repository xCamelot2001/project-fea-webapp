import React, { useState, useEffect } from "react";
import Greeting from "./components/Greeting";
import Message from "./components/Message";
import { ContentLogProvider, useContentLog } from './components/ContentLogContext'; // Import the context and hook

import { fetchContentSuggestions } from "../../services/apiService";

const IntegratedComponent = () => {
  const [conversation, setConversation] = useState([]);
  const [emotion, setEmotion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the context hook to access content log functions
  const { updateContentLog, isContentUnique } = useContentLog();

  // Function to handle fetching content based on emotion
  const handleContentSuggestion = async (detectedEmotion) => {
    if (!detectedEmotion) return; // Do nothing if no emotion is detected

    setIsLoading(true);
    try {
      const response = await fetchContentSuggestions(detectedEmotion);
      
      // Filter content that has already been shown to the user
      const newVideos = response.data.videos.filter(video => isContentUnique('video', video.url));
      const newArticles = response.data.articles.filter(article => isContentUnique('link', article.url));
      const isNewGeneratedContent = isContentUnique('generated', response.data.generatedContent);
      
      // Update conversation only with new content
      const newContent = [
        ...newVideos.length > 0 ? [{ type: "video", content: newVideos }] : [],
        ...newArticles.length > 0 ? [{ type: "link", content: newArticles }] : [],
        ...(isNewGeneratedContent ? [{ type: "generated", content: response.data.generatedContent }] : []),
      ];
      
      setConversation((prev) => [...prev, ...newContent]);

      // Update the content log with the new content
      newVideos.forEach(video => updateContentLog('video', video.url));
      newArticles.forEach(article => updateContentLog('link', article.url));
      if (isNewGeneratedContent) {
        updateContentLog('generated', response.data.generatedContent);
      }

    } catch (error) {
      console.error("Error fetching content suggestions:", error);
      setConversation((prev) => [
        ...prev,
        { type: "error", content: "An error occurred while fetching content suggestions." },
      ]);
    }
    setIsLoading(false);
  };

  // Effect to handle content suggestion when emotion changes
  useEffect(() => {
    handleContentSuggestion(emotion);
  }, [emotion]);

  return (
    <ContentLogProvider>
      <div>
        <Greeting onEmotionDetected={setEmotion} />
        {isLoading && <div>Loading...</div>}
        <div className="chatbox-container">
          <div className="messages">
            {conversation.map((m, index) => (
              <Message key={index} message={m} />
            ))}
          </div>
        </div>
      </div>
    </ContentLogProvider>
  );
};

export default IntegratedComponent;
