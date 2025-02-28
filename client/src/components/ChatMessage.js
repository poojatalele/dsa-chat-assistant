import React from 'react';
import './ChatMessage.css';
import ReactMarkdown from 'react-markdown';

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.type}`}>
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </div>
  );
}

export default ChatMessage;

