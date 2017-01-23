var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var path    = require('path');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(path.join(__dirname + '/client')));

const port = process.env.PORT || 2000;
http.listen(port, function(){
    console.log("Server started: http://localhost:2000/");
});

var SETTINGS = require('./server/js/utils/SETTINGS.js');
var lobbyManager = new (require('./server/js/gamestate/lobbymanager.js'))(io);
var roomManager  = new (require('./server/js/gamestate/roommanager.js'))(io);
var gameManager  = new (require('./server/js/gamestate/gamemanager.js'))(io, roomManager);

io.on('connection', function(socket){
    console.log('user connected: ', socket.id);
    io.to(socket.id).emit('connected', SETTINGS.CLIENT_SETTINGS);
    //Send data to all the sockets beside the emitting socket it self
    socket.broadcast.emit('new user entered');
    //Update total user
    io.emit('total user count updated', socket.server.eio.clientsCount);

    //push socket to lobby and delete them form lobby when they are ready
    socket.on('waiting', function(){
        console.log('waiting from ' + socket.id);
        lobbyManager.push(socket);
        lobbyManager.dispatch(roomManager);
    });

    socket.on('disconnect', function(){
        var roomIndex = roomManager.roomIndex[socket.id];
        if(roomIndex) roomManager.destroy(roomIndex);
        lobbyManager.kick(socket);
        console.log('user disconnected: ', socket.id);
        io.emit('total user count updated', socket.server.eio.clientsCount);
    });

    socket.on('ready', function(){
        var roomIndex = roomManager.roomIndex[socket.id];
        if(roomIndex) roomManager.rooms[roomIndex].objects[socket.id].ready = true;
    });

    socket.on('keydown', function(keyCode){
        var roomIndex = roomManager.roomIndex[socket.id];
        if(roomIndex) roomManager.rooms[roomIndex].objects[socket.id].keypress[keyCode] = true;
    });

    socket.on('keyup', function(keyCode){
        var roomIndex = roomManager.roomIndex[socket.id];
        if(roomIndex) delete roomManager.rooms[roomIndex].objects[socket.id].keypress[keyCode];
    });
});