const port = 3000;
const path = require('path');

const express = require('express');
const { createServer } = require("http");
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/socket-test.html'));
})

// Socket IO
io.on('connection', socket => {

  socket.on('to-server', () => {
    console.log('Socket received from client !');
    socket.emit('to-client');
  });

});