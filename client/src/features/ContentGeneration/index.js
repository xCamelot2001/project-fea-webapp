import React, { useState } from 'react';
import EmotionDetector from './components/EmotionDetector';
import CategorySelector from './components/CategorySelector';
import ContentTypeSelector from './components/ContentTypeSelector';
import ContentDisplay from './components/ContentDisplay';

const ContentGeneration = ({ initialContent }) => {
  const [userInput, setUserInput] = useState('');
  const [content, setContent] = useState(initialContent || '');
  const [emotion, setEmotion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [contentOptions, setContentOptions] = useState({});

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setContentOptions(contentTypes[category]);
  };

  const handleContentTypeSelect = (prompt) => {
    setUserInput(prompt);
    getContent(prompt, emotion);
  };

  const getContent = async (prompt, currentEmotion) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt, emotion: currentEmotion }),
      });
      const data = await response.json();
      setContent(data.generatedContent);
    } catch (error) {
      console.error('Error fetching generated content:', error);
    }
  };

  return (
    <div>
      <EmotionDetector onEmotionDetected={setEmotion} />
      <CategorySelector onSelectCategory={handleCategorySelect} categories={Object.keys(contentTypes)} />
      {selectedCategory && (
        <ContentTypeSelector onSelectContentType={handleContentTypeSelect} contentOptions={contentOptions} />
      )}
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getContent(userInput, emotion)}
          placeholder="Enter your prompt"
        />
        <button onClick={() => getContent(userInput, emotion)}>Generate Content</button>
      </div>
      <ContentDisplay content={content} />
    </div>
  );
};

export default ContentGeneration;
