require('dotenv').config();
const port = process.env.PORT || 3000;
const router = require('../routes/router');

const db = require('../config/config');

const express = require('express');
const {createServer} = require("http");
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        httpServer.close();
    }
});
app.use('/', router);

// Socket IO
io.on('connection', socket => {

    socket.on('to-server', () => {
        console.log('Socket received from client !');
        socket.emit('to-client');
    });

});