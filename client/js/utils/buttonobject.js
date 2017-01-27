const Textobject = require('./textobject.js');
function Buttonobject(){
  Textobject.call(this);
};
Buttonobject.prototype = new Textobject();
Buttonobject.prototype.constructor = Buttonobject;

Buttonobject.prototype.initialize = function(canvas,ctx,GAME_SETTINGS,data){
  Textobject.prototype.initialize.call(this,canvas,ctx,GAME_SETTINGS,data);
  var rect = this.data.rect;
  var text = this.data.text;
  rect.x = rect.x?rect.x:text.x?text.x:GAME_SETTINGS.WIDTH/2;
  rect.y = rect.y?rect.y:text.y?text.y:GAME_SETTINGS.HEIGHT/2;
  rect.color = rect.colorData.default;
  if(this.setEvents) this.setEvents(canvas);
};
Buttonobject.prototype.events = {};
Buttonobject.prototype.events.touchstart = function(e){
  e.preventDefault();
  buttonObject.mousemove(e);
}
Buttonobject.prototype.events.touchmove = function(e){
  buttonObject.mousemove(e);
}
Buttonobject.prototype.events.touchend = function(e){
  var x = e.changedTouches[0].clientX-e.changedTouches[0].target.offsetLeft;
  var y = e.changedTouches[0].clientY-e.changedTouches[0].target.offsetTop;
  var rect = buttonObject.data.rect;
  if(pointSquareCollusionCheck(x,y,rect)){
    buttonObject.click();
  }
};
Buttonobject.prototype.setEvents = function(canvas){
  buttonObject = this;
  $(canvas).on("click",function(e){
    if (buttonObject.data) {
      var rect = buttonObject.data.rect;
      if(pointSquareCollusionCheck(e.offsetX, e.offsetY, rect)){
        buttonObject.click();
      }
    }
  });
  $(canvas).on("mousemove",function(e){
    buttonObject.mousemove(e);
  });
  canvas.addEventListener("touchstart",Buttonobject.prototype.events.touchstart);
  canvas.addEventListener("touchmove",Buttonobject.prototype.events.touchmove);
  canvas.addEventListener("touchend",Buttonobject.prototype.events.touchend);
};
Buttonobject.prototype.mousemove = function(e){
  if(this.data){
    var x,y;
    if(e.type == "mousemove"){
      x = e.offsetX;
      y = e.offsetY;
    } else {
      x = e.changedTouches[0].clientX-e.changedTouches[0].target.offsetLeft;
      y = e.changedTouches[0].clientY-e.changedTouches[0].target.offsetTop;
    }
    var rect = this.data.rect;
    var text = this.data.text;
    var mouseover = pointSquareCollusionCheck(x, y, rect);

    rect.color = mouseover?rect.colorData.mouseover:rect.colorData.default;
    text.color = mouseover?text.colorData.mouseover:text.colorData.default;
  }
};
Buttonobject.prototype.draw = function(){
  if(!this.data) return;
  drawRect(this.ctx, this.data.rect);
  TextObject.prototype.draw.call(this);
};
module.exports = Buttonobject;

function drawRect(ctx, rect){
  if(!rect.color) return;
  ctx.save();
  ctx.beginPath();

  ctx.globalAlpha = rect.globalAlpha!==undefined?rect.globalAlpha:1;
  if(rect.color.fill){
    ctx.fillStyle = rect.color.fill;
    ctx.fillRect(rect.x-rect.width/2,rect.y-rect.height/2,rect.width,rect.height);
  }
  if(rect.color.stroke){
    ctx.strokeStyle = rect.color.stroke;
    ctx.lineWidth = rect.lineWidth;
    ctx.rect(rect.x-rect.width/2,rect.y-rect.height/2,rect.width,rect.height);
    ctx.stroke();
  }
  ctx.restore();
}

function pointSquareCollusionCheck(x,y,square){
  if(x >= square.x-square.width/2 && x <= square.x+square.width/2 && y >= square.y-square.height/2 && y <= square.y+square.height/2 )
    return true;
}
