import React, { useState } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';

const ContentGeneration = () => {
  const [userInput, setUserInput] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('');

  const getContent = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput, emotion: emotion }),
      });
      const data = await response.json();
      setContent(data.generatedContent);
    } catch (error) {
      console.error('Error fetching generated content:', error);
    }
  };

  // Function to render content based on its type
  const renderContent = () => {
    // Assuming that 'content' could be an object containing type and value
    if (typeof content === 'string') {
      return <p>{content}</p>;
    } else if (content.type === 'link') {
      return <a href={content.value} target="_blank" rel="noopener noreferrer">{content.text}</a>;
    } else if (content.type === 'video') {
      return (
        <iframe
          width="560"
          height="315"
          src={content.value}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video content"
        ></iframe>
      );
    }
  };

  return (
    <div>
      <VideoWithEmotionDetection onEmotionDetected={setEmotion} />
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onClick={(e) => e.key === 'Enter' && getContent()}
          placeholder="Enter your prompt"
        />
        <button onClick={getContent}>Generate Content</button>
      </div>
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentGeneration;
