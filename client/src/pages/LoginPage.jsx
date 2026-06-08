import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      try {
      
        await loginUser(username.trim());
        
        localStorage.setItem('chat_username', username.trim());
        navigate('/dashboard');
      } catch (error) {
        alert("Failed to login");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold text-center text-foreground">Join the Chat</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your username..."
              required
            />
          </div>
          <button 
            type="submit" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Enter Chat
          </button>
        </form>
      </div>
    </div>
  );
}
