// App.js
import React, { useState } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';
import ContentGeneration from './ContentGeneration';

function App() {
  const [generatedContent, setGeneratedContent] = useState('');

  // Add a function to update the generated content
  const handleNewGeneratedContent = (content) => {
    setGeneratedContent(content);
  };

  return (
    <div>
      <VideoWithEmotionDetection onGenerateContent={handleNewGeneratedContent} />
      <ContentGeneration content={generatedContent} />
    </div>
  );
}

export default App;
