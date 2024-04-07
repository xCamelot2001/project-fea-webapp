import React, { useEffect, useState } from 'react';
import { useEmotion } from './EmotionContext';

const emotionGreetings = {
  happy: "It's great to see you happy!",
  sad: "Feeling down?",
  surprised: "Wow, you seem surprised!",
  neutral: "Just another regular day?",
  disgusted: "Oops, something seems to have upset you.",
  angry: "You seem a bit tense.",
  fearful: "It's okay to feel scared sometimes."
};

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [isEmotionGreeted, setIsEmotionGreeted] = useState(false);
  const { emotion } = useEmotion();

  useEffect(() => {
    const getTimeOfDayGreeting = () => {
      const hours = new Date().getHours();
      return hours < 12 ? "Good morning!" : hours < 18 ? "Good afternoon!" : "Good evening!";
    };

    setGreeting(getTimeOfDayGreeting());
  }, []);

  useEffect(() => {
    // Only update the greeting if the emotion changes and the user hasn't been greeted for an emotion yet.
    if (emotion && !isEmotionGreeted) {
      setGreeting(prevGreeting => `${prevGreeting} ${emotionGreetings[emotion] || "How are you today?"}`);
      setIsEmotionGreeted(true); // Set the flag so that the emotion greeting doesn't update again
    }
  }, [emotion, isEmotionGreeted]); // Now the effect depends on `emotion` and `isEmotionGreeted`

  return (
    <div className="greeting-container">
      <h2>{greeting}</h2>
    </div>
  );
};

export default Greeting;
