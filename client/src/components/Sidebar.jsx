import React from 'react';

export default function Sidebar({ username, onLogout }) {
  return (
    <aside className="w-64 border-r border-border bg-card p-4 hidden md:flex flex-col">
      <h2 className="text-xl font-bold mb-4">Channels</h2>
      <div className="flex-1">
        <p className="text-muted-foreground text-sm"># general</p>
      </div>
      <div className="mt-auto pt-4 border-t border-border">
        <p className="font-semibold text-sm">{username}</p>
        <button 
          onClick={onLogout}
          className="text-xs text-destructive hover:underline mt-1"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
