import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('conversation');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('conversation', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (newUserMessage) => {
    const updatedMessages = [
      ...messages,
      { role: 'user', content: newUserMessage },
    ];
    setMessages(updatedMessages);

    try {
      const response = await fetch('https://dsa-chat-assistant.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: updatedMessages }),
      });

      const data = await response.json();
      const botReply = { role: 'assistant', content: data.hint };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error communicating with the server.' },
      ]);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem('conversation');
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSend} onNewChat={handleNewChat} />
    </div>
  );
}

export default ChatApp;
