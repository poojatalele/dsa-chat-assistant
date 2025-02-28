import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const handleSend = (url, question) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: `LeetCode URL: ${url}\nQuestion: ${question}`,
    };
    setMessages(prev => [...prev, userMessage]);

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      content: '',
    };
    setMessages(prev => [...prev, botResponse]);
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatApp;
