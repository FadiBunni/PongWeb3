'use strict';
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const path    = require('path');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(path.join(__dirname + '/client')));

const port = process.env.PORT || 2000;
http.listen(port, function(){
    console.log("Server started: http://localhost:2000/");
});

const SETTINGS = require('./server/js/utils/SETTINGS.js');
const lobbyManager = new (require('./server/js/gamestate/lobbymanager.js'))(io);
const roomManager  = new (require('./server/js/gamestate/roommanager.js'))(io);
const gameManager  = new (require('./server/js/gamestate/gamemanager.js'))(io, roomManager);

io.on('connection', function(socket){
    console.log('user connected: ', socket.id);
    io.to(socket.id).emit('connected', SETTINGS.CLIENT_SETTINGS);
    socket.broadcast.emit('new user entered');
    io.emit('total user count updated', socket.server.eio.clientsCount);

    socket.on('waiting', function(){
        console.log('waiting from ' + socket.id);
        lobbyManager.push(socket);
        lobbyManager.dispatch(roomManager);
    });

    socket.on('disconnect', function(){
        let roomIndex = roomManager.roomIndex[socket.id];
        if(roomIndex) {
            roomManager.destroy(roomIndex);
        }
        lobbyManager.kick(socket);
        console.log('user disconnected: ', socket.id);
        //io.emit('total user count updated', socket.server.eio.clientCount);
    });

    socket.on('ready', function(){
        let roomIndex = roomManager.roomIndex[socket.id];
        if(roomIndex){
            roomManager.rooms[roomIndex].objects[socket.id].ready = true;
        }
    });

    // socket.on('keydown', function(keyCode){
    //     let roomIndex = roomManager.roomIndex[socket.id];
    //     if(roomIndex){
    //         roomManager.rooms[roomIndex].objects[socket.id].keypress[keyCode] = true;
    //     }
    // });

    // socket.on('keyup', function(keyCode){
    //     let roomIndex = roomManager.roomIndex[socket.id];
    //     if(roomIndex) {
    //         delete roomManager.rooms[roomIndex].objects[socket.id].keypress[keyCode];
    //     }
    // });

    // socket.on('mousemove', function(x,y){
    //     let roomIndex = roomManager.roomIndex[socket.id];
    //     if(roomIndex) {
    //         roomManager.rooms[roomIndex].objects[socket.id].mouse.move={x:x,y:y};
    //     }
    // });

    // socket.on('click', function(x,y){
    //     let roomIndex = roomManager.roomIndex[socket.id];
    //     if(roomIndex) {
    //         roomManager.rooms[roomIndex].objects[socket.id].mouse.click={x:x,y:y};
    //     }
    // });
});