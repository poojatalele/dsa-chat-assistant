import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.type}`}>
      <p>{message.content}</p>
    </div>
  );
}

export default ChatMessage;
