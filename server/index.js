import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const messages = [
  { sender: 'System', text: 'Welcome to the API powered chat!', timestamp: Date.now() }
];
let users = ['System'];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  
  if (!users.includes(username)) {
    users.push(username);
  }
  
  res.json({ success: true, username });
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  console.log(messages);
 
  socket.on('join', (username) => {
    socket.username = username;
    
    socket.broadcast.emit('userJoined', username);
    
    io.emit('updateUsers', users);
  });

  socket.on('sendMessage', (data) => {
    const newMessage = {
      sender: data.sender,
      text: data.text,
      timestamp: Date.now()
    };
    messages.push(newMessage); 
  
    io.emit('receiveMessage', newMessage);
  });

 
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id} (${socket.username})`);
    if (socket.username) {
      users = users.filter(u => u !== socket.username && u !== 'System');
      users.unshift('System'); 
      io.emit('userLeft', socket.username);
      io.emit('updateUsers', users);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
