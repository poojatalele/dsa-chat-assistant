import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend }) {
  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !question) return;
    onSend(url, question);
    setUrl('');
    setQuestion('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter LeetCode URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Enter your doubt or question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
