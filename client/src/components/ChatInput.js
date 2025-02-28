import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend, initialMode }) {
  const [text, setText] = useState('');

   const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
   };

  return (
    <form 
      className={`chat-input ${initialMode ? 'initial-mode' : ''}`} 
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder={initialMode ? 'Ask anything...' : 'Type your message...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
