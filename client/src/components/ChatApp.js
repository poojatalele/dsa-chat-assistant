import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (newUserMessage) => {
    
    const updatedMessages = [
      ...messages,
      { role: 'user', content: newUserMessage },
    ];
    setMessages(updatedMessages);

    try {
      
      const response = await fetch('http://localhost:5000/api/chat', {
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

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
     
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatApp;
