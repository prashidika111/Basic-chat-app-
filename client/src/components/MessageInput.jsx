import React, { useState } from 'react';

export default function MessageInput({ onSendMessage, onTyping }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText(''); 
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (onTyping) {
      onTyping(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-border flex gap-2 shrink-0">
      <input 
        type="text" 
        value={text}
        onChange={handleChange}
        placeholder="Type a message..." 
        className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <button 
        type="submit" 
        disabled={!text.trim()}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Send
      </button>
    </form>
  );
}
