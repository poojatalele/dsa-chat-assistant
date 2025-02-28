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
    setMessages((prev) => [...prev, userMessage]);
    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, question }),
    })
      .then((res) => res.json())
      .then((data) => {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.hint || 'No response from server.',
        };
        setMessages((prev) => [...prev, botResponse]);
      })
      .catch((error) => {
        console.error('Error:', error);
        const errorMsg = {
          id: Date.now() + 2,
          type: 'bot',
          content: 'Error communicating with the server.',
        };
        setMessages((prev) => [...prev, errorMsg]);
      });
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
