import React, { useState, useEffect } from "react";
import Greeting from "./components/Greeting";
import Message from "./components/Message";
import VideoWithEmotionDetection from "./components/VideoWithEmotionDetection";
import { useEmotion } from './components/EmotionContext';
import { useContentLog } from './components/ContentLogContext';
import { fetchContentSuggestions } from "../../services/apiService";

const IntegratedComponent = () => {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { updateContentLog, isContentUnique } = useContentLog();
  const { emotion } = useEmotion();

  const handleContentSuggestion = async () => {
    if (!emotion) return; // Do nothing if no emotion is detected
    setIsLoading(true);
    
    try {
      const response = await fetchContentSuggestions(emotion);
      const data = response.data; // Assuming axios response structure
      
      const newVideos = data.videos.filter(video => isContentUnique('video', video.url));
      const newArticles = data.articles.filter(article => isContentUnique('link', article.url));
      const isNewGeneratedContent = isContentUnique('generated', data.generatedContent);
      
      const newContent = [
        ...newVideos.length > 0 ? newVideos.map(video => ({ type: "video", content: video })) : [],
        ...newArticles.length > 0 ? newArticles.map(article => ({ type: "link", content: article })) : [],
        ...(isNewGeneratedContent ? [{ type: "generated", content: data.generatedContent }] : []),
      ];
      
      setConversation(prev => [...prev, ...newContent]);
      newVideos.forEach(video => updateContentLog('video', video.url));
      newArticles.forEach(article => updateContentLog('link', article.url));
      if (isNewGeneratedContent) {
        updateContentLog('generated', data.generatedContent);
      }
    } catch (error) {
      console.error("Error fetching content suggestions:", error);
      setConversation(prev => [
        ...prev,
        { type: "error", content: "An error occurred while fetching content suggestions." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (emotion) {
      handleContentSuggestion();
    }
  }, [emotion]);

  return (
    <div>
      <Greeting />
      <VideoWithEmotionDetection />
      {isLoading && <div>Loading...</div>}
      <div className="chatbox-container">
        <div className="messages">
          {conversation.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedComponent;
