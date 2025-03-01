import React from 'react';
import './ChatMessage.css';
import ReactMarkdown from 'react-markdown';

function ChatMessage({ message }) {
  const { role, content } = message;

  return (
    <div className={`chat-bubble ${role}`}>
      <div className="bubble-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;
