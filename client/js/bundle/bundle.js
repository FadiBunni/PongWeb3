(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//initializing "classes"
// var cUtils = require('./utils/utils.canvas.js');
// var Keys = require('./utils/utils.keys.js');
// var Constants = require('./utils/client.constants.js');
// var Player = require('./entities/player.js');
// var Ball = require('./entities/ball.js');

// Setting up canvas
// var w = Constants.w, h = Constants.h;
// var canvas = cUtils.generateCanvas(w, h);
// var ctx = canvas.getContext('2d');
// var serverFull = document.getElementById('full');

//socket connection, and exporting for other files.
var socket = io();
// exports.socket = socket;

// Player.list = {};
// Ball.list = {};

// //communication with the server:
// socket.on('init', function(data){
//     for(var i = 0; i < data.player.length; i++){
//         new Player(data.player[i]);
//     }
//     console.log(data.player);
//     for(var i = 0; i < data.ball.length; i++){
//         new Ball(data.ball[i]);
//     }
// });

// socket.on('update', function(data){
//     for(var i = 0; i< data.player.length; i++){
//         var pack = data.player[i];
//         var p = Player.list[pack.id];
//         if(p){
//             // do I need x?
//             if(pack.x !== undefined)
//                 p.x = pack.x;
//             if(pack.y !== undefined)
//                 p.y = pack.y;
//         }
//     }

//     for(var i = 0; i< data.ball.length; i++){
//         var pack = data.ball[i];
//         var b = Ball.list[pack.id];
//         if(b){
//             if(pack.x !== undefined)
//                 b.x = pack.x;
//             if(pack.y !== undefined)
//                 b.y = pack.y;
//         }
//     }
// });

// socket.on('remove', function(data){
//     for(var i = 0; i < data.player.length; i++)
//         delete Player.list[data.player[i]];
//     for(var i = 0; i < data.ball.length; i++)
//         delete Ball.list[data.ball[i]];
// });

// socket.on('serverIsFull', function(data){
//     serverFull.style.display = 'block';
//     serverFull.innerHTML = data;
// });

// //draw entities and background
// setInterval(function(){
//     ctx.clearRect(0,0,w,h);
//     ctx.fillStyle = "black";
//     ctx.fillRect(0,0,w,h);
//     for(var i in Player.list)
//         Player.list[i].draw(ctx);
//     for(var i in Ball.list)
//         Ball.list[i].draw(ctx);
// },20);


// //Key handler!
// document.addEventListener('keydown', Keys.onkeydown);
// document.addEventListener('keyup', Keys.onkeyup);
},{}]},{},[1]);
