import React, { useState, useEffect } from 'react';
import VideoWithEmotionDetection from './VideoWithEmotionDetection';
import ReactMarkdown from 'react-markdown';

const ContentGeneration = ({ initialContent }) => {
  const [userInput, setUserInput] = useState('');
  const [content, setContent] = useState(initialContent || '');
  const [emotion, setEmotion] = useState('');
  const [greeting, setGreeting] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [contentOptions, setContentOptions] = useState({});

  // Content types for each category
  const contentTypes = {
    fun: {
      joke: "Tell me a joke",
      story: "Tell me a funny story",
      fact: "Give me a fun fact"
    },
    motivation: {
      poem: "Inspire me with a poem",
      quote: "Give me a motivational quote",
      biography: "Tell me about someone inspiring"
    },
    comfort: {
      supportiveMessage: "I need some words of comfort",
      meditation: "Guide me through a short meditation",
      music: "Suggest calming music"
    }
  };

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

  // Set greeting message based on user's emotion
  useEffect(() => {
    if (emotion && !hasGreeted) {
      setGreeting(getGreeting(emotion));
      setHasGreeted(true);
    }
  }, [emotion, hasGreeted]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setContentOptions(contentTypes[category]);
  };

  // Handle content type selection
  const handleContentTypeSelect = (prompt) => {
    setUserInput(prompt);
    getContent();
  };

  // Fetch generated content from the server
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
      <div className="greeting-message">
        <h2>{greeting}</h2>
      </div>
      <div className="category-selection">
        {Object.keys(contentTypes).map((category) => (
          <button key={category} onClick={() => handleCategorySelect(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="content-type-selection">
          {Object.entries(contentOptions).map(([type, prompt]) => (
            <button key={type} onClick={() => handleContentTypeSelect(prompt)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getContent()}
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
