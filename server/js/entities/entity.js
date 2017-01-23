var SETTINGS = require("../utils/SETTINGS.js");
var Entity = function(){
    var self = {
        x:20,
        y: SETTINGS.HEIGHT/2 - 140/2,
        spdX:0,
        spdY:0,
        id:""
    }

    self.update = function(){
        self.updatePosition();
    }
    self.updatePosition = function(){
        self.x += self.spdX;
        self.y += self.spdY;
    }
    return self;
}

module.exports = Entity;