const express = require('express');
const http = require('http');
const { Server } = require ('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection',socket => {
    console.log('A User connected');

    socket.on('chat message', msg => {
        // Broadcast to all clients except sender
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect',() => {
        console.log('A User disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Chatroom running at https://altfashion.uk`);
});
