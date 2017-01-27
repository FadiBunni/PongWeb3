const SETTINGS = require("./SETTINGS.js");
const Baseobject = require("./Baseobject.js");

function Spark(x,y){
  Baseobject.call(this);
  this.countMax = 100;
  this.count = 100;
  var test = 5;
  this.xPower = -test+Math.random()*test*2;
  this.yPower = -test+Math.random()*test*2;
  this.blinkingTerm = Math.random()*5;
  this.status.shape = "rectangle";
  this.status.rect = {
    height : 10,
    width : 10,
    x : x,
    y : y,
    color : {fill:"#000000"},
    globalAlpha : 1
  };

  this.update = function(room){
    if(this.count>0){
      this.count--;
      var power = Math.pow(this.count,3)/Math.pow(this.countMax,3);
      this.status.rect.globalAlpha = (this.count%10>this.blinkingTerm&&this.count%10<this.blinkingTerm+5)?this.count/this.countMax:0;
      this.status.rect.x += power*this.xPower;
      this.status.rect.y += power*this.yPower;
    } else {
        var index = room.effects.indexOf(this);
        if(index >= 0) room.effects.splice(index,1);
    }
    return this;
  };
}
module.exports = Spark;