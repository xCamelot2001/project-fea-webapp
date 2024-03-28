import React from 'react';
import ReactMarkdown from 'react-markdown';

const ContentDisplay = ({ content }) => {
  return (
    <div className="content-area">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default ContentDisplay;