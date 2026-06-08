import React from 'react';

export default function ChatHeader({ channelName }) {
  return (
    <header className="h-14 border-b border-border flex items-center px-4 bg-card/50 backdrop-blur shrink-0">
      <h2 className="font-bold text-foreground"># {channelName}</h2>
    </header>
  );
}
