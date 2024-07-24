const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.json()); // Para manejar JSON en las peticiones POST

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-message', (req, res) => {
  const { message, user } = req.body;
  if (message) {
    io.emit('chat message', { user: user || 'Server', msg: message });
    res.sendStatus(200);
  } else {
    res.sendStatus(400); // Bad Request si el mensaje está vacío
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
