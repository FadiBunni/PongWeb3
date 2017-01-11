var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var path    = require('path');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(path.join(__dirname + '/client')));

var port = process.env.PORT || 2000;
http.listen(port, function(){
    console.log("Server started: http://localhost:2000/");
});

var SETTINGS = require('./server/js/utils/SETTINGS.js');

//var lobbyManager = require('./server/js/gamestate/lobbymanager.js')(io);
//var roomManager = require('./server/js/gamestate/roommanager.js')(io);
//var gameManager = require('./server/js/gamestate/gamemanager.js')(io, roomManager);

io.on('connection', function(socket){
    io.to(socket.id).emit('connected', SETTINGS.CLIENT_SETTINGS);
    console.log('user connected: ', socket.id);












});