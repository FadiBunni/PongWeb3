function LobbyManager(io){
	let LbMg = thisM
	LbMg.lobby = [];
	LbMg.updating = false;

	LbMg.push = function(socket){
		if(LbMg.lobby.indexOf(socket) < 0){
			//console.log('lobbyin: ' + socket.id);
			LbMg.lobby.push(socket);
		}
	};

	LbMg.kick = function(socket) {
		let index = LbMg.lobby.indexOf(socket);
		if(index >= 0 ){
			LbMg.lobby.splice(index, 1);
		}
	};

	LbMg.dispatch = function(RmMg){
		if(LbMg.dispatching) return;
		LbMg.dispatching = true;

		while(LbMg.lobby.length > 1) {
			let player0 = LbMg.lobby.splice(0,1);
			let player1 = LbMg.lobby.splice(0,1);
			RmMg.create(player0[0],player1[0]);
			//console.log("lobbyout: "+player0[0].id);
      		//console.log("lobbyout: "+player1[0].id);
     		//console.log("lobbyout.length: "+LbMg.lobby.length);
		}
		LbMg.dispatching = false;
	};

	LbMg.clean = function() {
		let socket = LbMg.lobby;
		LbMg.lobby = socket.filter(function(socket){
			return socket !== null;
		});
	};
}

module.exports = LobbyManager;