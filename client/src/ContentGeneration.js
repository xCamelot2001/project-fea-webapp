import React, { useState } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';
import ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ContentGeneration;
