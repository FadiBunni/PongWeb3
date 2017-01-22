const Countdown = require("./countdown.js");
const SETTINGS = require('./SETTINGS.js');
var ready = {
	initialize: function(io,room){
		this.io = io;
		room.status = "ready";
		//Set the loop in the room equal to the loop in ready variable
		room.loop = this.loop;
		/*Destroy can be called because RmMg is inside the room contructor.
		Calling the destroy function in RmMg not in this 'ready' variable*/
		room.RmMg.destroy(room.id);
		//Add countdown to the room.object array and instantiate a new one
		room.objects.countdown = new Countdown(10,null,SETTINGS.HEIGHT-40);
    	room.objects.countdown.action = function(room){
     		delete room.objects.countdown;
      		room.RmMg.destroy(room.id);
    	};
	},

	loop: function(room){
		var player0ready = room.objects[room.players[0].id].ready;
		var player1ready = room.objects[room.players[1].id].ready;
		if(player0ready && player1ready) {
			ready.destroy(room);
			playing.initialize(ready.io,room);
		}
		var statuses = getStatsFromObejcts(room);
		ready.io.to(room.id).emit('update', statuses);
	},

	destroy: function(room){
		delete room.objects.playing;
	}

};

var playing = {
	initialize: function(io,room){
		this.io = io;
		room.status = "countdown";
		room.loop = this.loop;
		room.status = "playing";
		room.objects.countdown = new Countdown(3,null,SETTINGS.HEIGHT*3/4,100);
    	room.objects.countdown.action = function(room){
      		delete room.objects.countdown;
      		room.status = "playing";
   		};
    	io.to(room.id).emit('playing');
	},

	loop: function(room){
		var statuses = getStatsFromObejcts(room);
		playing.io.to(room.id).emit('update', statuses);
		if(room.status == "playing" /*(room.objects[room.players[0].id].score>=SETTINGS.GOAL ||room.objects[room.players[1].id].score>=SETTINGS.GOAL)*/){
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

module.exports = {ready,playing};


function getStatsFromObejcts(room){
	var statuses = [];
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
