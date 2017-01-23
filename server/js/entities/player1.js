var SETTINGS = require("../utils/SETTINGS.js");
var Baseobject = require("../utils/baseobject.js");
var Entity = require('./entity.js');

var Player = function(id, side){
    var self = Entity();
    self.id = id;
    self.pressingUp = false;
    self.pressingDown = false;
    self.maxSpd = 10;
    self.side = side;
    self.style = side == "left" ? "red" : "blue";
    self.sizeLength = 140;
    self.sizeWidth = 25;
    var w = SETTINGS.WIDTH, h = SETTINGS.HEIGHT;

    if(self.style == "blue")
        self.x = w - (self.sizeWidth + 20);

    var super_update = self.update;
    self.update = function() {
        self.updateSpd();
        super_update();
        self.sideCollision();
    }

    self.updateSpd = function(){
        if(self.pressingUp)
            self.spdY = -self.maxSpd;
        else if (self.pressingDown)
            self.spdY = self.maxSpd;
        else
            self.spdY = 0;
    }

    self.sideCollision = function() {
        if(self.y < 0 ){
            self.y = 0;
        }else if(self.y > h - self.sizeLength){
             self.y = h - self.sizeLength;
        }
    }

    self.getInitPack = function() {
        return {
            id:self.id,
            x:self.x,
            y:self.y,
            sizeLength:self.sizeLength,
            sizeWidth:self.sizeWidth,
            style:self.style
        };
    }

    self.getUpdatePack = function() {
        return {
            id:self.id,
            y:self.y
        };
    }

    Player.list[id] = self;

    var initPack = Mainapp.initPack;
    initPack.player.push(self.getInitPack());
    return self;
}

module.exports = Player;