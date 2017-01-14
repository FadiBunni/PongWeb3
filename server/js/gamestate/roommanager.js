const Room = require('./room.js');
const SETTINGS = require('./utils/SETTINGS.js');

function RoomManager(io){
	let RmMg = this;
	RmMg.rooms = {};
	RmMg.roomIndex = {};

	RmMg.create = function(socket0, socket1){
		let roomId = socket0.id+socket1.id;
		let room = Room(RmMg, io, roomId, socket0, socket1);
		socket0.join(roomId);
		socekt1.join(roomId);
		RmMg.rooms[roomId] = room;
		RmMg.roomIndex[socket0.id] = roomId;
		RmMg.roomIndex[socket1.id] = roomId;
		ready.initialize(io,room);
		io.to(socket0.id).emit('ready', 'left');
		io.to(socket1.id).emit('ready', 'right');
		console.log('Room Created: ', roomId);

	};

	RmMg.destroy = function(roomId){
		let room = RmMg.rooms[roomId];
		room.players.forEach(function(socket){
			let message = (!room.objects[socket.id].ready /*&& !room.objects.countdown*/) ? "You are not prepared": null;
			delete RmMg.roomIndex[socket.id];
			io.to(socket.id).emit('destroy', message);
		});
		delete RmMg.rooms[roomId];
	};

	RmMg.gameOver = function(roomId, winner){
		let room = RmMg.rooms[roomId];
		room.players.forEach(function(socket){
			let message = (socket.id == winner) ? "You win!" : "You lose!";
			delete RmMg.roomIndex[socket.id];
			io.to(socket.id).emit('destroy', message);
		});
		delete RmMg.rooms[roomId];

	};
}

module.exports = RoomManager;