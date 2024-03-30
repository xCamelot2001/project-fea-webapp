import React, { useState } from 'react';
import { fetchYouTubeLinks, fetchSearchResults } from '../../services/apiService';

const ChatBox = ({ emotion }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === '') return;
    
    setConversation('text', message);
    setMessage('');
  
    try {
      // Fetch YouTube links and add to the conversation
      const youtubeResponse = await fetchYouTubeLinks(emotion);
      if (youtubeResponse.data.links) {
        setConversation('video', youtubeResponse.data.links);
      }
  
      // Fetch search results and add to the conversation
      const searchResponse = await fetchSearchResults(emotion);
      if (searchResponse.data.links) {
        setConversation('link', searchResponse.data.links);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      // Optionally, update the UI to inform the user that an error occurred.
      setConversation('error', 'An error occurred while fetching content.');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="messages">
        {conversation.map((m, index) => (
          <div key={index} className={`message ${m.type}`}>
            {m.type === 'text' && <p>{m.content}</p>}
            {m.type === 'video' && m.content.map((url, idx) => <div key={idx}><a href={url} target="_blank" rel="noopener noreferrer">YouTube Video</a></div>)}
            {m.type === 'link' && m.content.map((url, idx) => <div key={idx}><a href={url} target="_blank" rel="noopener noreferrer">Related Article</a></div>)}
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