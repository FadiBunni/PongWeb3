var SETTINGS = require("../utils/SETTINGS.js");
var Baseobject = require("../utils/baseobject.js");

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var UNIT = 2;

function Player(id, position){
  Baseobject.call(this);
  var color = "#";
  for(var i = 0; i < 6; i++ ){
    color += (Math.floor(Math.random()*16)).toString(16);
  }
  var xPos;
  switch(position){
    case "LEFT":
      xPos = SETTINGS.PLAYER.GAP;
      break;
    case "RIGHT":
      xPos = SETTINGS.WIDTH-SETTINGS.PLAYER.GAP;
      break;
  }
  this.role = "player";
  this.status.shape = "rectangle";
  this.id = id;
  this.score = 0;
  this.ready = false;
  this.keypress = {};

  this.status.rect = {
    height : SETTINGS.PLAYER.HEIGHT,
    width : SETTINGS.PLAYER.WIDTH,
    x : xPos,
    y : SETTINGS.HEIGHT/2,
    color : {fill:color}
  };

  //Create a new baseobject()
  this.prototype = new Baseobject();
  //
  this.prototype.constructor = Player;

  Player.prototype.update = function(room){
    var player = this.status.rect;
    if(room.status == "countdown" || room.status == "playing"){
      if(this.keypress[UP]){
          if(player.y - player.height/2 - UNIT >= 0 + SETTINGS.BORDER_WIDTH)
          player.y -= UNIT;
      }
      if(this.keypress[DOWN]){
          if(player.y + player.height/2 + UNIT <= SETTINGS.HEIGHT - SETTINGS.BORDER_WIDTH)
          player.y += UNIT;
      }
    }
  }
};
module.exports = Player;
