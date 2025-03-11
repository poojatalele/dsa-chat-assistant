import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend, onNewChat }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <div className="button-group">
        <button type="submit">Send</button>
        {/* This button calls the onNewChat function passed down from ChatApp */}
        <button type="button" onClick={onNewChat}>New Chat</button>
      </div>
    </form>
  );
}

export default ChatInput;
