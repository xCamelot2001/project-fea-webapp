import React, { useState, useEffect } from 'react';
import ContentGeneration from '../features/ContentGeneration';

const Home = () => {
  const [content, setContent] = useState(''); // Initialize the content state

  useEffect(() => {
    const generateDefaultContent = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: 'Hello, welcome to ExprEssence!', emotion: 'neutral' }),
        });
        const data = await response.json();
        setContent(data.generatedContent); // Set the content state with the fetched data
      } catch (error) {
        console.error('Error fetching generated content:', error);
      }
    };

    generateDefaultContent();
  }, []);

  return (
    <div>
      <ContentGeneration initialContent={content} />
    </div>
  );
};

export default Home;
