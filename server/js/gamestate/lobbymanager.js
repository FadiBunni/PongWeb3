function LobbyManager(io){
	var LbMg = this;
	LbMg.lobby = [];
	LbMg.updating = false;

	LbMg.push = function(socket){
		if(LbMg.lobby.indexOf(socket) < 0){
			//console.log('lobbyin: ' + socket.id);
			LbMg.lobby.push(socket);
		}
	};

	LbMg.kick = function(socket) {
		var index = LbMg.lobby.indexOf(socket);
		if(index >= 0 ){
			LbMg.lobby.splice(index, 1);
		}
	};

	LbMg.dispatch = function(RmMg){
		if(LbMg.dispatching) return;
		LbMg.dispatching = true;

		while(LbMg.lobby.length > 1) {
			var player0 = LbMg.lobby.splice(0,1);
			var player1 = LbMg.lobby.splice(0,1);
			RmMg.create(player0[0],player1[0]);
			//console.log("lobbyout: "+player0[0].id);
      		//console.log("lobbyout: "+player1[0].id);
     		//console.log("lobbyout.length: "+LbMg.lobby.length);
		}
		LbMg.dispatching = false;
	};
}

module.exports = LobbyManager;