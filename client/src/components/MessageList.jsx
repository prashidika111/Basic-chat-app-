import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function MessageList({ messages, currentUser }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-background">
      {messages.length === 0 ? (
        <div className="text-center text-muted-foreground text-sm mt-10">
          No messages yet. Be the first to say hello!
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble 
            key={index} 
            message={msg} 
            isOwnMessage={msg.sender === currentUser} 
          />
        ))
      )}
      {}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
