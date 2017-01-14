const SETTINGS = require('./utils/SETTINGS.js');
function Room (RmMg, io, id, socket0, socket1){
	let room = this;
	room.id = id;
	room.RmMg = RmMg;
	room.players = [socket0,socket1];
	room.objects = {};
	// room.objects[room.players[0].id] = new Player(room.players[0].id, "LEFT");
	// room.objects[room.players[1].id] = new Player(room.players[1].id, "RIGHT");
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

let ready = {
	initialize: function(io,room){
		this.io = io;
		room.status = "ready";
		room.loop = this.loop;
		room.RmMg.destroy(room.id);
		// room.objects.countdown = new Countdown(10,null,SETTINGS.HEIGHT-40);
  //   	room.objects.countdown.action = function(room){
  //    		delete room.objects.countdown;
  //     		room.RmMg.destroy(room.id);
  //   	};
	},

	loop: function(room){
		let player0ready = room.objects[room.players[0].id].ready;
		let player1ready = room.objects[room.players[1].id].ready;
		if(player0ready && player1ready) {
			ready.destroy(room);
			playing.initialize(ready.io,room);
		}
		let statuses = getStatsFromObejcts(room);
		ready.io.to(room.id).emit('update', statuses);
	},

	destroy: function(room){
		delete room.objects.playing;
	}

};

let playing = {
	initialize: function(io,room){
		this.io = io;
		room.status = "countdown";
		room.loop = this.loop;
		room.status = "playing";
		// room.objects.countdown = new Countdown(3,null,SETTINGS.HEIGHT*3/4,100);
  //   	room.objects.countdown.action = function(room){
  //     		delete room.objects.countdown;
  //     		room.status = "playing";
  //  		};
    	io.to(room.id).emit('playing');
	},

	loop: function(room){
		let statuses = getStatsFromObejcts(room);
		playing.io.to(room.id).emit('update', statuses);
		if(room.status == "playing" && /*(room.objects[room.players[0].id].score>=SETTINGS.GOAL ||room.objects[room.players[1].id].score>=SETTINGS.GOAL)*/){
			room.status = "gameOver";
			room.gameOverDelay = 3;
		}
		if(room.status == "gameOver" && room.gameOverDelay --< 0){
			//if(room.objects[room.players[0].id].score>room.objects[room.players[1].id].score){
        	room.RmMg.gameOver(room.id,room.players[0].id);
      		//} else {
        		//room.RmMg.gameOver(room.id,room.players[1].id);
			//}
		}
	}
};

function getStatsFromObejcts(room){
	let statuses = [];
	for(var object in room.objects){
		var obj = room.objects[object];
		obj.update(room);
		statuses.push(obj.status);
	}
	room.effects.forEach(function(effect){
		effect.update(room);
		statuses.push(effect.status);
	});
	return statuses;
}
