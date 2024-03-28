import React, { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    // Add the message to the conversation and reset the input
    setConversation([...conversation, { type: 'text', content: message }]);
    setMessage('');
    
    // Here you can also send the message to the backend if needed
  };

  return (
    <div className="chatbox-container">
      <div className="messages">
        {conversation.map((m, index) => (
          <div key={index} className="message">
            {m.type === 'text' && <p>{m.content}</p>}
            {/* Implement handlers for other types like 'link' or 'image' */}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
