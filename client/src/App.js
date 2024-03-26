import React, { useState } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';
import ContentGeneration from './ContentGeneration';

function App() {
  const [generatedContent, setGeneratedContent] = useState('');

  const handleNewGeneratedContent = (emotion) => {
    // Use the emotion to call the backend and update generatedContent
    fetch('/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emotion }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGeneratedContent(data.generatedContent);
      })
      .catch((error) => {
        console.error('Error sending emotion to backend:', error);
      });
  };

  return (
    <div>
      <VideoWithEmotionDetection onGenerateContent={handleNewGeneratedContent} />
      {/* Pass handleNewGeneratedContent instead of content */}
      <ContentGeneration handleNewGeneratedContent={handleNewGeneratedContent} />
      {/* Optionally, you can display the generated content here */}
      <p>Generated Content: {generatedContent}</p>
    </div>
  );
}

export default App;
