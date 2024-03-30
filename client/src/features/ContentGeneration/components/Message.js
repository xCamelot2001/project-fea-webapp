import React from "react";
import ContentDisplay from "./ContentDisplay";

const Message = ({ message }) => {
  // Helper to render content based on the type of message
  const renderContent = () => {
    switch (message.type) {
      case "text":
        return <p>{message.content}</p>;
      case "video":
        return message.content.map((video, idx) => (
          <div key={idx} className="video">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnail} alt={video.title} />
              <div>{video.title}</div>
            </a>
          </div>
        ));
      case "link":
        return message.content.map((article, idx) => (
          <div key={idx} className="article">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
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
