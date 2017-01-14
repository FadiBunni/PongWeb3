const INTERVAL = 10;

function GameManager(io, roomManager){
	let GmMg = this;
	GmMg.RmMg = roomManager;

	GmMg.update = setInterval(function(){
		for(var roomID in GmMg.RmMg.rooms){
			var room = GmMg.RmMg.room[roomID];
			room.runLoop(room);
		}
	},INTERVAL);
}

module.exports = GameManager;