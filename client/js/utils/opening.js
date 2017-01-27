const Textobject = require('./textobject.js');
function Opening(){};
Opening.prototype.initialize = function(canvas,ctx,GAME_SETTINGS){
  this.ctx = ctx;
  var titleSetting = [{
    x : GAME_SETTINGS.WIDTH/2,
    y : 100,
    size : 100,
    space : 100,
    lineWidth : 5,
    color : {fill:"#ED5566", stroke:"#000000"},
    text : "SMASH"
  }, {
    x : GAME_SETTINGS.WIDTH/2+150,
    y : 220,
    size : 60,
    space : 60,
    lineWidth : 5,
    color : {fill:"#128123", stroke:"#000000"},
    text : "PONG"
  }, {
    x : GAME_SETTINGS.WIDTH/2+217,
    y : 165,
    size : 12,
    space : 12,
    lineWidth : 5,
    color : {fill:"#000000"},
    text : "Ver. " + GAME_SETTINGS.VER
  }];
  this.title=[];
  for(var i=0; i<titleSetting.length; i++){
    this.title[i] = generateTitleText(titleSetting[i]);
  }
  this.count = -1;
  this.animationLayer = [];

  var opening = this;
  this.animationLayer[0] = [Hide(this.animationLayer[0], this.title[0], 0)];
  this.animationLayer[0].push(Down(this.animationLayer[0], this.title[0], 50, 500));

  this.animationLayer[1] = [Hide(this.animationLayer[1], this.title[1], 0)];
  this.animationLayer[1].push(Down(this.animationLayer[1], this.title[1], 150, 500));

  this.animationLayer[2] = [Hide(this.animationLayer[2], this.title[2], 0)];
  this.animationLayer[2].push(FadeIn(this.animationLayer[2], this.title[2], 250, 500));

  // Opening Functions
  function generateTitleText(title){
    var returnArray = [];
    var middleIndex = (title.text.length-1)/2;
    for(var i = 0 ; i < title.text.length ; i++){
      var text = new Textobject();
      var data = {
        x : title.x + title.space * (i-middleIndex),
        y : title.y,
        size: title.size,
        font: "'Press Start 2P'",
        textBaseline: "middle",
        textAlign: "center",
        lineWidth: title.lineWidth,
        message: title.text[i],
        color: {fill:undefined, stroke:undefined},
        colorData: {
          default: title.color
        }
      };
      text.initialize(canvas,ctx,GAME_SETTINGS,{
        text : data,
        default : data
      });
      returnArray.push(text);
    }
    return returnArray;
  }

  function Down(animationLayer, title, startCount, endCount){
    var actionData = [];
    return function closure(){
      if(opening.count == startCount){
        for(var i = 0 ; i < title.length ; i++){
          title[i].data.text = clone(title[i].data.default);
          title[i].data.text.y = title[i].data.text.y-40;
          title[i].data.text.globalAlpha = 0.0;
          actionData[i] = {startCount: startCount+i*15, speed: 1};
        }
      }
      if(opening.count >= startCount && opening.count < endCount ){
        for(var i = 0 ; i < title.length ; i++){
          if(opening.count >= actionData[i].startCount && title[i].data.text.y<title[i].data.default.y){
            actionData[i].speed = (title[i].data.default.y-title[i].data.text.y)/40+0.3;
            title[i].data.text.y = title[i].data.text.y+ actionData[i].speed;
            if(title[i].data.text.globalAlpha < 1){
              title[i].data.text.globalAlpha += 0.1;
            }else{
              title[i].data.text.globalAlpha += 1;
            };
          }
        }
      }
      if(endCount && opening.count == endCount){
        for(var i = 0 ; i < title.length ; i++){
          title[i].data.text = clone(title[i].data.default);
        }
        var index = animationLayer.indexOf(closure);
        animationLayer.splice(0,index+1);
      }
    }
  }

  function Hide(animationLayer, title, startCount, endCount){
    var data;
    return function closure(){
      if(opening.count == startCount){
        for(var i = 0 ; i < title.length ; i++){
          title[i].data.text = clone(title[i].data.default);
          title[i].data.text.globalAlpha=0;
        }
      }
      if(endCount && opening.count == endCount){
        for(var i = 0 ; i < title.length ; i++){
          title[i].data.text = clone(title[i].data.default);
        }
        var index = animationLayer.indexOf(closure);
        animationLayer.splice(0,index+1);
      }
    }
  }

  function FadeIn(animationLayer, title, startCount, endCount){
    var actionData = [];
    return function closure(){
      if(opening.count == startCount){
        for(var i = 0 ; i < title.length ; i++){
          title[i].data.text = clone(title[i].data.default);
          title[i].data.text.globalAlpha = 0.0;
          actionData[i] = {startCount: startCount+i*15, speed: 1};
        }
      }
      if(opening.count >= startCount && opening.count < endCount ){
        for(var i = 0 ; i < title.length ; i++){
          if(opening.count >= actionData[i].startCount){

            if(title[i].data.text.globalAlpha < 1){
              title[i].data.text.globalAlpha += 0.1;
            }else{
              title[i].data.text.globalAlpha += 1;
            };
          }
        }
      }
      if(endCount && opening.count == endCount){
        for(var i = 0 ; i < title.length ; i++){
          title[i].data.text = clone(title[i].data.default);
        }
        var index = animationLayer.indexOf(closure);
        animationLayer.splice(0,index+1);
      }
    }
  }
  this.drawOpeningBackground = (function(){

    var bgWidth = 512;
    var bgHeight = 178;
    var xOffset = 0;
    var yOffset = 0;
    return function(){
      xOffset++;
      yOffset++;
      if(xOffset>bgWidth) xOffset = 0;
      if(yOffset>bgHeight) yOffset = 0;

      var backgroundPatten = document.createElement('canvas');
      backgroundPatten.width = bgWidth;
      backgroundPatten.height = bgHeight;

      // var texture = new Image();
      // texture.src = "/img/background001.png";

      // var PattenCtx = backgroundPatten.getContext("2d");
      // PattenCtx.drawImage(texture,xOffset-bgWidth,yOffset-bgHeight);
      // PattenCtx.drawImage(texture,xOffset-bgWidth,yOffset);
      // PattenCtx.drawImage(texture,xOffset,yOffset-bgHeight);
      // PattenCtx.drawImage(texture,xOffset,yOffset);

      var pat = ctx.createPattern(backgroundPatten,"repeat");

      ctx.save();
      ctx.fillStyle = pat;
      ctx.fillRect(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);
      ctx.restore();
    }
  })();
}

Opening.prototype.update = function(){
  var count = this.count++;
  this.animationLayer.forEach(function(animationLayer){
    animationLayer.forEach(function(action){
      action();
    });
  });
}
Opening.prototype.draw = function(){
  var ctx = this.ctx;
  this.drawOpeningBackground();
  this.title.forEach(function(title){
    title.forEach(function(char){
      drawText(ctx, char.data.text);
    });
  });
}
function clone (object){
  return JSON.parse(JSON.stringify(object))
}

module.exports = Opening;