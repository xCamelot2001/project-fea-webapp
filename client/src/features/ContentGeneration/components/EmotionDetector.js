import React, { useState, useEffect } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';

const EmotionDetector = ({ onEmotionDetected }) => {
  const [greeting, setGreeting] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);

  // Greeting messages based on user's emotion
  const emotionGreetings = {
    happy: "It's great to see you happy! What can we do to keep the good vibes going?",
    sad: "Feeling down? Let's find something to brighten your day.",
    surprised: "Wow, you seem surprised! Shall we explore more?",
    neutral: "Just another regular day? Let's make it interesting.",
    disgusted: "Oops, something seems to have upset you. How about we turn that frown upside down?",
    angry: "You seem a bit tense. Let's take a moment to relax and regroup.",
    fearful: "It's okay to feel scared sometimes. Let's find a way to make you feel safe and comfortable."
  };

  // Function to fetch the greeting message
  const getGreeting = (currentEmotion) => {
    const hours = new Date().getHours();
    return currentEmotion && emotionGreetings[currentEmotion]
      ? emotionGreetings[currentEmotion]
      : hours < 12
      ? "Good morning! Let's get started."
      : hours < 18
      ? "Good afternoon! Ready for some creativity?"
      : "Good evening! Time to wind down.";
  };

  useEffect(() => {
    if (!hasGreeted) {
      const currentEmotion = onEmotionDetected();
      setGreeting(getGreeting(currentEmotion));
      setHasGreeted(true);
    }
  }, [onEmotionDetected, hasGreeted]);

  return (
    <>
      <VideoWithEmotionDetection onEmotionDetected={onEmotionDetected} />
      <div className="greeting-message">
        <h2>{greeting}</h2>
      </div>
    </>
  );
};

export default EmotionDetector;
