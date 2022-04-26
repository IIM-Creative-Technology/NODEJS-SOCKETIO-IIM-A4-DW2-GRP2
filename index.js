const port = 3000;

const express = require('express');
const { createServer } = require("http");
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// Socket IO
io.on('connection', socket => {

  socket.on('to-server', () => {
    console.log('Socket received !');
  });

});