const Player = require('../entities/player.js');
function Room (RmMg, io, id, socket0, socket1){
	var room = this;
	room.id = id;
	room.RmMg = RmMg;
	room.players = [socket0,socket1];
	room.objects = {};
	room.objects[room.players[0].id] = new Player(room.players[0].id, "LEFT");
	room.objects[room.players[1].id] = new Player(room.players[1].id, "RIGHT");
	// room.objects.player0Score = new Score(room.players[0].id, "LEFT");
	// room.objects.player1Score = new Score(room.players[1].id, "RIGHT");
	// room.objects.ball = new Ball(room.players[0].id, room.players[1].id);
	room.effects = [];
	room.sounds = [];
	room.loop = function(){};
	room.playsounds = function(){
		if(room.sounds.length > 0){
			io.to(room.id).emit('playSound', room.sounds.pop());
		}
	};
	room.runLoop = function(room) {
		room.loop(room);
		room.playSounds();
	};
}

module.exports = Room;
