import React, { useState } from 'react';
import ContentGeneration from '../features/ContentGeneration';


const Home = () => {
  const [emotion, setEmotion] = useState('neutral'); // Initialize the emotion state

  return (
    <div>
      <ContentGeneration emotion={emotion} onEmotionDetected={setEmotion} />
    </div>
  );
};

export default Home;
