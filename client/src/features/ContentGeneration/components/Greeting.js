import React, { useEffect, useState, useRef } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';

const emotionGreetings = {
  happy: "It's great to see you happy!",
  sad: "Feeling down?",
  surprised: "Wow, you seem surprised!",
  neutral: "Just another regular day?",
  disgusted: "Oops, something seems to have upset you.",
  angry: "You seem a bit tense.",
  fearful: "It's okay to feel scared sometimes."
};

function Greeting() {
  const [greeting, setGreeting] = useState('');
  const greetedRef = useRef(false);

  const getTimeOfDayGreeting = () => {
    const hours = new Date().getHours();
    return hours < 12 ? "Good morning!" : hours < 18 ? "Good afternoon!" : "Good evening!";
  };

  useEffect(() => {
    setGreeting(getTimeOfDayGreeting());
  }, []);

  const handleEmotionDetected = (detectedEmotion) => {
    if (!greetedRef.current) {
      const emotionGreeting = emotionGreetings[detectedEmotion] || "How are you today?";
      setGreeting((prevGreeting) => `${prevGreeting} ${emotionGreeting}`);
      greetedRef.current = true;
    }
  };

  return (
    <div>
      <VideoWithEmotionDetection onEmotionDetected={handleEmotionDetected} />
      <GreetingDisplay greeting={greeting} />
    </div>
  );
}

function GreetingDisplay({ greeting }) {
  return (
    <div className="greeting">
      <h2>{greeting}</h2>
    </div>
  );
}

export default Greeting;
