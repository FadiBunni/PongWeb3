function Textobject(){};

Textobject.prototype.initialize = function(canvas,ctx,GAME_SETTINGS,data){
  this.canvas = canvas;
  this.ctx = ctx;
  this.GAME_SETTINGS = GAME_SETTINGS;
  this.data = data;

  var text = this.data.text;
  var animation = data.animation;
  text.x = text.x?text.x:GAME_SETTINGS.WIDTH/2;
  text.y = text.y?text.y:GAME_SETTINGS.HEIGHT/2;
  text.color = text.colorData.default;
};

Textobject.prototype.draw = function(){
  if(!this.data) return;
  drawText(this.ctx, this.data.text);
};
Textobject.prototype.update = function(){

}

module.exports = Textobject;

function drawText(ctx, text){
  if(!text.color) return;
  ctx.save();
  ctx.beginPath();

  ctx.font = text.size+"px "+text.font;
  ctx.textAlign = text.textAlign;
  ctx.textBaseline = text.textBaseline;
  ctx.globalAlpha = text.globalAlpha!==undefined?text.globalAlpha:1;
  if(text.color.stroke){
    ctx.strokeStyle = text.color.stroke;
    ctx.lineWidth = text.lineWidth;
    ctx.strokeText(text.message, text.x, text.y);
  }
  if(text.color.fill){
    ctx.fillStyle = text.color.fill;
    ctx.fillText(text.message, text.x, text.y);
  }
  ctx.restore();
}