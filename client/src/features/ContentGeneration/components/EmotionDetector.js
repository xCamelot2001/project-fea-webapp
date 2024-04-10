import React, { useState, useEffect, useRef } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';

const EmotionDetector = ({ onEmotionDetected }) => {
  const [greeting, setGreeting] = useState('');
  const hasGreeted = useRef(false);

  // Greeting messages based on user's emotion
  const emotionGreetings = {
    happy: "It's great to see you happy!",
    sad: "Feeling down?",
    surprised: "Wow, you seem surprised!",
    neutral: "Just another regular day?",
    disgusted: "Oops, something seems to have upset you.",
    angry: "You seem a bit tense.",
    fearful: "It's okay to feel scared sometimes."
  };

  // Function to get time of day greeting
  const getTimeOfDayGreeting = () => {
    const hours = new Date().getHours();
    return hours < 12 ? "Good morning! " : hours < 18 ? "Good afternoon! " : "Good evening! ";
  };

  // Initialize with a time of day greeting
  useEffect(() => {
    setGreeting(getTimeOfDayGreeting());
  }, []);

  // Function to handle emotion detection
  const handleEmotionDetected = (emotion) => {
    if (!hasGreeted.current) {
      setGreeting(g => g + (emotionGreetings[emotion] || "How are you today?"));
      hasGreeted.current = true;
      onEmotionDetected(emotion);
    }
  };

  return (
    <div>
      <VideoWithEmotionDetection onEmotionDetected={handleEmotionDetected} />
      <div className="greeting">
        {hasGreeted.current ? <h2>{greeting}</h2> : null}
      </div>
    </div>
  );
};

export default EmotionDetector;