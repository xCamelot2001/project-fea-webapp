import React from "react";
import ContentDisplay from "./ContentDisplay";

const Message = ({ message }) => {
  // Helper to render content based on the type of message
  const renderContent = () => {
    switch (message.type) {
      case "text":
        return <p>{message.content}</p>;
      case "video":
        return message.content.map((url, idx) => (
          <div key={idx}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              YouTube Video
            </a>
          </div>
        ));
      case "link":
        return message.content.map((url, idx) => (
          <div key={idx}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Related Article
            </a>
          </div>
        ));
      case "generated":
        return <ContentDisplay content={message.content} />;
      default:
        return null;
    }
  };

  return <div className={`message ${message.type}`}>{renderContent()}</div>;
};

export default Message;
