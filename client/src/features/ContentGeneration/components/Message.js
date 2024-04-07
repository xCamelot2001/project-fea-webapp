import React from "react";
import ContentDisplay from "./ContentDisplay";

const Message = ({ message }) => {
  // Helper to render content based on the type of message
  const renderContent = () => {
    switch (message.type) {
      case "text":
        // Assuming message.content is a string or renderable entity
        return <p>{message.content}</p>;
      case "video":
        // Directly rendering video content assuming it's not an array
        return (
          <div className="video">
            <a href={message.content.url} target="_blank" rel="noopener noreferrer">
              <img src={message.content.thumbnail} alt={message.content.title} />
              <div>{message.content.title}</div>
            </a>
          </div>
        );
      case "link":
        // Directly rendering link content assuming it's not an array
        return (
          <div className="article">
            <a href={message.content.url} target="_blank" rel="noopener noreferrer">
              {message.content.title}
            </a>
          </div>
        );
      case "generated":
        // Directly rendering generated content assuming it's not an array
        return <ContentDisplay content={message.content} />;
      default:
        return null;
    }
  };

  return <div className={`message ${message.type}`}>{renderContent()}</div>;
};

export default Message;
