var SETTINGS = require("./SETTINGS.js");
var Baseobject = require("./baseobject.js");

function Countdown(count,xPos,yPos,size){
  Baseobject.call(this);
  this.defaultCount = count?count:10;
  this.defaultSize = size?size:40;
  this.createdAt = Date.now();
  this.status = "text";
  this.status = {
    color : {fill:"#123456",stroke:"#ffffff"},
    font : "Arial",
    lineWidth : 10,
    textAlign : "center",
    textBaseline : "middle",
    size : this.defaultSize,
    message : this.defaultCount,
    x : xPos?xPos:SETTINGS.WIDTH/2,
    y : yPos?yPos:SETTINGS.HEIGHT/2
  };
}
Countdown.prototype = new Baseobject();
Countdown.prototype.constructor = Countdown;
Countdown.prototype.update = function(room){
  var count = this.defaultCount-Math.floor((Date.now()-this.createdAt)/1000);
  if(this.status.message != count && count >= 0){
    this.status.size = this.defaultSize;
    this.status.message = count;
  } else {
    this.status.size *= 0.997;
  }
  if(count<0){
    this.action(room);
  }
};
Countdown.prototype.action = function(room){};
module.exports = Countdown;