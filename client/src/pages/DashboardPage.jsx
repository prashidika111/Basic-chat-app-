import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import OnlineUsers from '../components/OnlineUsers';
import { fetchMessages, fetchUsers } from '../services/api';
import { socket } from '../sockets/socketManager';

export default function DashboardPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem('chat_username');
  
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!username) {
      navigate('/');
      return;
    }

    const loadData = async () => {
      const initialMessages = await fetchMessages();
      console.log("Fetched messages:", initialMessages);
      setMessages(initialMessages);
   
    };
    loadData();

    socket.connect();
    
    socket.emit('join', username);

    socket.on('receiveMessage', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    socket.on('updateUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('userJoined', (user) => {
   
      setMessages(prev => [...prev, { sender: 'System', text: `${user} joined the chat`, timestamp: Date.now() }]);
    });

    socket.on('userLeft', (user) => {
      setMessages(prev => [...prev, { sender: 'System', text: `${user} left the chat`, timestamp: Date.now() }]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('updateUsers');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.disconnect();
    };
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('chat_username');
    navigate('/');
  };

  const handleSendMessage = (text) => {

    socket.emit('sendMessage', { sender: username, text });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar username={username} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader channelName="general" />
        <MessageList messages={messages} currentUser={username} />
        <MessageInput onSendMessage={handleSendMessage} />
      </main>
      <OnlineUsers users={onlineUsers} />
    </div>
  );
}
