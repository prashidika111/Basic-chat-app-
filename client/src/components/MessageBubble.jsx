import React from 'react';

export default function MessageBubble({ message, isOwnMessage }) {
  return (
    <div className={`flex flex-col mb-4 max-w-[75%] ${isOwnMessage ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
      <div className="flex items-baseline mb-1 space-x-2">
        <span className="text-sm font-semibold text-foreground">{message.sender}</span>
        <span className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className={`p-3 rounded-lg ${isOwnMessage ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground rounded-tl-none'}`}>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}
