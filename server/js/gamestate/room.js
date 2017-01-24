var Score = require('../utils/score.js');
var Player = require('../entities/player.js');
var Ball = require('../entities/ball.js');

function Room (RmMg, io, id, player0, player1){
	var room = this;
	room.RmMg = RmMg;
	room.id = id;
	room.players = [player0,player1];
	room.objects = {};
	/*Add to object player.id(socket.id) as a new player form the player class.
	Also add other stuff in the object array.*/
	room.objects[room.players[0].id] = new Player(room.players[0].id, "LEFT");
	room.objects[room.players[1].id] = new Player(room.players[1].id, "RIGHT");
	room.objects.player0Score = new Score(room.players[0].id, "LEFT");
	room.objects.player1Score = new Score(room.players[1].id, "RIGHT");
	room.objects.ball = new Ball(room.players[0].id, room.players[1].id);
	room.effects = [];
	room.sounds = [];

	room.playsounds = function(){
		if(room.sounds.length > 0){
			io.to(room.id).emit('playSound', room.sounds.pop());
		}
	};

	//The room.loop is set in STATES.js!!!!!!!!
	room.runLoop = function(room) {
		room.loop(room);
		//room.playSounds();
	};
}

module.exports = Room;
