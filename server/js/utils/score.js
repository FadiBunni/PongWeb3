var SETTINGS = require("./SETTINGS.js");
var Baseobject = require("./baseobject.js");

function Score(id,position){
  var xPos;
  switch(position){
    case "LEFT":
      xPos = SETTINGS.WIDTH/2-SETTINGS.SCORE.GAP;
      break;
    case "RIGHT":
      xPos = SETTINGS.WIDTH/2+SETTINGS.SCORE.GAP;
      break;
  }
  Baseobject.call(this);
  this.playerId = id;
  this.status.shape = "text";
  this.status.text = {
    color : {fill:"#123456"},
    font : "Arial",
    textAlign : "center",
    textBaseline : "middle",
    size : SETTINGS.SCORE.SIZE,
    message : undefined,
    x : xPos,
    y : SETTINGS.SCORE.Y
  };
}
Score.prototype = new Baseobject();
Score.prototype.constructor = Score;
Score.prototype.update = function(room){
  this.status.text.message = room.objects[this.playerId].score;
};
module.exports = Score;