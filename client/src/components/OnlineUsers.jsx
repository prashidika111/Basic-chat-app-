import React from 'react';

export default function OnlineUsers({ users }) {
  return (
    <aside className="w-64 border-l border-border bg-card p-4 hidden lg:flex flex-col shrink-0">
      <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
        Online — {users.length}
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {users.map((user, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            {}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
              {user.charAt(0)}
            </div>
            <span className="text-sm text-foreground">{user}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
