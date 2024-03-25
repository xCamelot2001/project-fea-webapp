import React, { useState } from 'react';

const ContentGeneration = ({ emotion }) => {
  const [content, setContent] = useState('');

  const getContent = async () => {
    try {
      const response = await fetch('/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion }),
      });
      const data = await response.json();
      setContent(data.generatedContent);
    } catch (error) {
      console.error('Error fetching generated content:', error);
    }
  };

  return (
    <div>
      <button onClick={getContent}>Generate Content</button>
      <p>{content}</p>
    </div>
  );
};

export default ContentGeneration;
