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

  return (
    <div>
      <VideoWithEmotionDetection onEmotionDetected={setEmotion} />
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={getContent}>Generate Content</button>
      <p>{content}</p>
    </div>
  );
};

export default ContentGeneration;
