import React, { useEffect, useState, useRef } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';

const Greeting = ({ onEmotionDetected }) => {
  const [greeting, setGreeting] = useState('');
  const greetedRef = useRef(false); // This ref persists across re-renders without causing them

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
    return hours < 12 ? "Good morning!" : hours < 18 ? "Good afternoon!" : "Good evening!";
  };

  useEffect(() => {
    // Only set the greeting once
    if (!greetedRef.current) {
      setGreeting(getTimeOfDayGreeting());
      greetedRef.current = true;
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <VideoWithEmotionDetection onEmotionDetected={(emotion) => {
        // Only update the greeting if it hasn't been done after initial render
        if (!greetedRef.current) {
          setGreeting(prev => `${prev} ${emotionGreetings[emotion] || "How are you today?"}`);
          greetedRef.current = true; // Prevent further updates
        }
        onEmotionDetected(emotion);
      }} />
      <div className="greeting">
        <h2>{greeting}</h2>
      </div>
    </div>
  );
};

export default Greeting;
