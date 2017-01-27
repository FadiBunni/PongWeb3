const Opening = new (require('./opening.js'));
const Buttonobject = new (require('./buttonobject.js'));


var start = {
  misc: function() {
    var misc =this.misc;
    misc.opening = Opening;
    misc.button1 = Buttonobject;
    console.log(misc.opening);
    misc.button1.click = function(){
      start.toWaiting();
    };
    misc.button1.update = function(){
      var text = this.data.text;
      var animation = this.data.animation;
      animation.count += animation.dir;
      if(animation.count <= 0 || animation.count >= animation.maxCount ){
        animation.dir *= -1;
      }
      text.globalAlpha = 0.2 + 0.7*(animation.count/100);
    };
  },

  initialize: function(canvas,ctx,GAME_SETTINGS){
    Opening.initialize(canvas,ctx,GAME_SETTINGS);
    Buttonobject.initialize(canvas,ctx,GAME_SETTINGS,{
      text:{
        x: undefined,
        y: 310,
        size: 30,
        font: "Arial",
        textBaseline: "middle",
        textAlign: "center",
        lineWidth: 2,
        message: "START GAME",
        color: {fill:undefined, stroke:undefined},
        colorData: {
          default: {fill:"#123456", stroke:undefined},
          mouseover: {fill:"#ddeeff", stroke:undefined}
        }
      },
      rect: {
        x: undefined,
        y: undefined,
        width: 230,
        height: 50,
        lineWidth: 2,
        color: {fill:undefined, stroke:undefined},
        colorData: {
          default: {fill:"#1099cc", stroke:"#223344"},
          mouseover: {fill:"#0686e0", stroke:"#223344"}
        }
      },
      animation: {
        maxCount: 100,
        count: 0,
        dir: 1,
      }
    });
    mainLoop = start.loop;
  },

  loop: function(){
    Opening.update();
    Buttonobject.update();
    drawBackground();
    Opening.draw();
    Buttonobject.update();
  },

  destory:function(){
    $(canvas).off();
    canvas.removeEventListener("touchstart",ButtonObject.prototype.events.touchstart);
    canvas.removeEventListener("touchmove",ButtonObject.prototype.events.touchmove);
    canvas.removeEventListener("touchend",ButtonObject.prototype.events.touchend);
  },

  toWait: function(){
    start.destroy();
    socket.emit('waiting');
    waiting.initialize();
  }
};

var waiting = {
  initialize: function(){},
  loop: function(){},
  destory:function(){},
};

var ready = {
  initialize: function(){},
  loop: function(){},
  destory:function(){},
};

var playing = {
  initialize: function(){},
  loop: function(){},
  destory:function(){},
};

module.exports = {start,waiting,ready,playing};
  // var backToTitle = {

  // };

// var start = new (function(){
//     var start = this;
//     start.opening = Opening;
//     start.button1 = Buttonobject;
//     start.button1.click = function(){
//       start.toWaiting();
//     };
//     start.button1.update = function(){
//       var text = this.data.text;
//       var animation = this.data.animation;
//       animation.count += animation.dir;
//       if(animation.count <= 0 || animation.count >= animation.maxCount ){
//         animation.dir *= -1;
//       }
//       text.globalAlpha = 0.2 + 0.7*(animation.count/100);
//     };
//     start.initialize = function(canvas,ctx,GAME_SETTINGS){
//       start.opening.initialize(canvas,ctx,GAME_SETTINGS);
//       start.button1.initialize(canvas,ctx,GAME_SETTINGS,{
//         text:{
//           x: undefined,
//           y: 310,
//           size: 30,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: 2,
//           message: "START GAME",
//           color: {fill:undefined, stroke:undefined},
//           colorData: {
//             default: {fill:"#123456", stroke:undefined},
//             mouseover: {fill:"#ddeeff", stroke:undefined}
//           }
//         },
//         rect: {
//           x: undefined,
//           y: undefined,
//           width: 230,
//           height: 50,
//           lineWidth: 2,
//           color: {fill:undefined, stroke:undefined},
//           colorData: {
//             default: {fill:"#1099cc", stroke:"#223344"},
//             mouseover: {fill:"#0686e0", stroke:"#223344"}
//           }
//         },
//         animation: {
//           maxCount: 100,
//           count: 0,
//           dir: 1,
//         }
//       });
//       mainLoop = start.loop;
//     };
//     start.loop = function(){
//       start.opening.update();
//       start.button1.update();
//       drawBackground();
//       start.opening.draw();
//       start.button1.draw();
//     };
//     start.destroy = function(){
//       $(canvas).off();
//       canvas.removeEventListener("touchstart",ButtonObject.prototype.events.touchstart);
//       canvas.removeEventListener("touchmove",ButtonObject.prototype.events.touchmove);
//       canvas.removeEventListener("touchend",ButtonObject.prototype.events.touchend);
//     };
//     start.toWaiting = function(){
//       start.destroy();
//       socket.emit('waiting');
//       waiting.initialize();
//     };
//   })();

//   var waiting = new (function(){
//     var waiting = this;

//     waiting.text1 = new TextObject();
//     waiting.text1.update = function(){
//       var text = this.data.text;
//       var animation = this.data.animation;
//       animation.count += animation.dir;
//       if(animation.count <= 0 || animation.count >= animation.maxCount ){
//         animation.dir *= -1;
//       }
//       text.globalAlpha = 0.2 + 0.7*(animation.count/100);
//     };

//     waiting.initialize = function(){
//       waiting.text1.initialize(canvas,ctx,GAME_SETTINGS,{
//         text:{
//           x: undefined,
//           y: undefined,
//           size: 30,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: 2,
//           message: "WAITING FOR OPPONENT..",
//           globalAlpha: undefined,
//           color: {fill: undefined, stroke: undefined},
//           colorData: {
//             default: {fill: "#000000", stroke: undefined}
//           }
//         },
//         animation: {
//           maxCount: 100,
//           count: 0,
//           dir: 1,
//         }
//       });
//       mainLoop = waiting.loop;
//     };
//     waiting.loop = function(){
//       waiting.text1.update();
//       drawBackground();
//       waiting.text1.draw();
//     };
//     waiting.destroy = function(){
//     }
//   })();

//   var ready = new (function(){
//     var ready = this;
//     ready.interval = null;

//     ready.text1 = new TextObject();

//     ready.text2 = new TextObject();

//     ready.button1 = new ButtonObject();
//     ready.button1.click = function(e){
//       socket.emit('ready');
//       ready.text2.data.text.message = "WAITING FOR OPPONENT TO BE READY";
//       ready.button1.data = null;
//     };
//     ready.button1.update = function(){
//       if(!this.data) return;
//       var text = this.data.text;
//       var animation = this.data.animation;
//       animation.count += animation.dir;
//       if(animation.count <= 0 || animation.count >= animation.maxCount ){
//         animation.dir *= -1;
//       }
//       text.globalAlpha = 0.5 + 0.5*(animation.count/100);
//     };

//     ready.initialize = function(position){
//       var xPos
//       switch(position){
//         case "left":
//           message = "< YOU  "
//           xPos = GAME_SETTINGS.WIDTH*1/4;
//           break;
//         case "right":
//           message = "  YOU >"
//           xPos = GAME_SETTINGS.WIDTH*3/4;
//           break;
//       }

//       ready.text1.initialize(canvas,ctx,GAME_SETTINGS,{
//         text:{
//           x: xPos,
//           y: undefined,
//           size: 25,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: 2,
//           message: message,
//           globalAlpha: undefined,
//           color: {fill: undefined, stroke: undefined},
//           colorData: {
//             default: {fill: "#fc6e51", stroke: undefined}
//           }
//         }
//       });
//       ready.text2.initialize(canvas,ctx,GAME_SETTINGS,{
//         text:{
//           x: undefined,
//           y: GAME_SETTINGS.HEIGHT-80,
//           size: 20,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: 5,
//           message: "CLICK [READY] TO GET READY",
//           globalAlpha: undefined,
//           color: {fill: undefined, stroke: undefined},
//           colorData: {
//             default: {fill: "#434a54", stroke: "#FFFFFF"}
//           }
//         }
//       });
//       ready.button1.initialize(canvas,ctx,GAME_SETTINGS,{
//         rect: {
//           x: xPos,
//           y: GAME_SETTINGS.HEIGHT/2+40,
//           width: 150,
//           height: 40,
//           lineWidth: 2,
//           color: {fill:undefined, stroke:undefined},
//           colorData: {
//             default: {fill:"#ffce54", stroke:undefined},
//             mouseover: {fill:"#f6bb42", stroke:undefined}
//           }
//         },
//         text:{
//           x: xPos,
//           y: GAME_SETTINGS.HEIGHT/2+40,
//           size: 28,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: undefined,
//           message: "READY",
//           color: {fill:undefined, stroke:undefined},
//           colorData: {
//             default: {fill:"#123456", stroke:undefined},
//             mouseover: {fill:"#ffffff", stroke:undefined}
//           }
//         },
//         animation: {
//           maxCount: 100,
//           count: 0,
//           dir: 1,
//         }
//       });
//       mainLoop = ready.loop;
//     };
//     ready.loop = function(){
//       ready.button1.update();
//       drawBackground();
//       drawNet();
//       drawBorder();
//       serverObjects.forEach(drawObjects);
//       ready.button1.draw();
//       ready.text1.draw();
//       ready.text2.draw();
//     };
//     ready.destroy = function(){
//       $(canvas).off();
//       canvas.removeEventListener("touchstart",ButtonObject.prototype.events.touchstart);
//       canvas.removeEventListener("touchmove",ButtonObject.prototype.events.touchmove);
//       canvas.removeEventListener("touchend",ButtonObject.prototype.events.touchend);
//     };
//   })();

//   var playing = new (function(){
//     var playing = this;

//     playing.events={};
//     playing.events.canvas=function(e){
//       var x = e.changedTouches[0].clientX-e.changedTouches[0].target.offsetLeft;
//       var y = e.changedTouches[0].clientY-e.changedTouches[0].target.offsetTop;
//       e.preventDefault();
//       socket.emit('click', x, y);
//     }
//     playing.events.body=function(e){
//       var canvasTop = canvas.offsetTop;
//       var canvasBottom = canvas.offsetHeight+canvasTop;
//       if(e.changedTouches[0].clientY>canvasTop && e.changedTouches[0].clientY<canvasBottom){
//         e.preventDefault();
//         var y = e.changedTouches[0].clientY-canvasTop;
//         socket.emit('click', null, y);
//       }
//     }

//     playing.initialize = function(){
//       $('body').on('keydown', function(e){
//         if(e.keyCode>=37 && e.keyCode<=40){
//           e.preventDefault();
//           socket.emit('keydown', e.keyCode);
//         }
//       });
//       $('body').on('keyup', function(e){
//         if(e.keyCode>=37 && e.keyCode<=40){
//           e.preventDefault();
//           socket.emit('keyup', e.keyCode);
//         }
//       });
//       $('canvas').on('mousemove', function(e){
//         e.preventDefault();
//         socket.emit('mousemove', e.offsetX, e.offsetY);
//       });
//       $('canvas').on('click', function(e){
//         e.preventDefault();
//         socket.emit('click', e.offsetX, e.offsetY);
//       });
//       canvas.addEventListener("touchstart",playing.events.canvas);
//       canvas.addEventListener("touchmove",playing.events.canvas);
//       document.body.addEventListener("touchstart",playing.events.body);
//       document.body.addEventListener("touchmove",playing.events.body);
//       mainLoop = playing.loop;
//     };
//     playing.loop = function(){
//       drawBackground();
//       drawNet();
//       drawBorder();
//       serverObjects.forEach(drawObjects);
//     };
//     playing.destroy = function(){
//       $('body').off();
//       $('canvas').off();
//       canvas.removeEventListener("touchstart",playing.events.canvas);
//       canvas.removeEventListener("touchmove",playing.events.canvas);
//       document.body.removeEventListener("touchstart",playing.events.body);
//       document.body.removeEventListener("touchmove",playing.events.body);
//     };
//   })();

//   var backToTitle = new (function(){
//     var backToTitle = this;
//     backToTitle.interval = null;
//     backToTitle.text1 = new TextObject();
//     backToTitle.text1.update = function(){
//       var text = this.data.text;
//       var animation = this.data.animation;
//       animation.count++;
//       text.globalAlpha = 0.2 + 0.7*(animation.count/100);
//     };
//     backToTitle.text2 = new TextObject();
//     backToTitle.text2.update = function(){
//       var text = this.data.text;
//       var animation = this.data.animation;
//       if(animation.count == 0) text.color = undefined;
//       animation.count++;
//       if(animation.count == 101){
//         text.color = text.colorData.default;
//       }
//       if(animation.count > 100) text.globalAlpha = ((animation.count-100)/150);
//     };

//     backToTitle.initialize = function(message){
//       backToTitle.count =0;
//       backToTitle.text1.initialize(canvas,ctx,GAME_SETTINGS,{
//         text:{
//           x: undefined,
//           y: GAME_SETTINGS.HEIGHT/2-20,
//           size: 32,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: undefined,
//           message: message?message:"OPPONENT LEFT!",
//           globalAlpha: undefined,
//           color: {fill: undefined, stroke: undefined},
//           colorData: {default:{fill: "#000000", stroke: undefined}}
//         },
//         animation: {
//           maxCount: 200,
//           count: 0,
//         }
//       });
//       backToTitle.text2.initialize(canvas,ctx,GAME_SETTINGS,{
//         text:{
//           x: undefined,
//           y: GAME_SETTINGS.HEIGHT/2+20,
//           size: 25,
//           font: "Arial",
//           textBaseline: "middle",
//           textAlign: "center",
//           lineWidth: undefined,
//           message: "GOING BACK TO START..",
//           globalAlpha: undefined,
//           color: {fill: undefined, stroke: undefined},
//           colorData: {default:{fill: "#000000", stroke: undefined}}
//         },
//         animation: {
//           count: 0,
//         }
//       });
//       mainLoop = backToTitle.loop;
//     };
//     backToTitle.loop = function(){
//       backToTitle.text1.update();
//       backToTitle.text2.update();
//       backToTitle.update();
//       backToTitle.draw();
//       backToTitle.text1.draw();
//       backToTitle.text2.draw();
//     };
//     backToTitle.count = undefined;
//     backToTitle.imgData = undefined;
//     backToTitle.update = function(){
//       if(backToTitle.count == 0){
//         drawBackground(0.8);
//         backToTitle.imgData=ctx.getImageData(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);
//       }
//       backToTitle.count++;
//       if(backToTitle.count >= 300){
//         backToTitle.destroy();
//         start.initialize();
//       }
//     }
//     backToTitle.draw = function(){
//       ctx.putImageData(backToTitle.imgData,0,0);
//     }
//     backToTitle.destroy = function(){
//     };
//   })();
// });

function drawObjects(status){
    switch(status.shape){
      case "rectangle":
        drawRect(ctx,status.rect);
        break;
      case "circle":
        ctx.fillStyle = status.color;
        ctx.beginPath();
        ctx.arc(status.x,status.y,status.r,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        break;
      case "text":
        drawText(ctx,status.text);
        break;
    }
  }

  function drawBackground(globalAlpha,color,GAME_SETTINGS){
    ctx.save();
    ctx.globalAlpha = globalAlpha!==undefined?globalAlpha:1;
    ctx.fillStyle = color?color:GAME_SETTINGS.BACKGROUND_COLOR;
    ctx.fillRect(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);
    ctx.restore();
  }

  function drawBorder(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.BORDER_WIDTH);
    ctx.fillRect(0,GAME_SETTINGS.HEIGHT-GAME_SETTINGS.BORDER_WIDTH,GAME_SETTINGS.WIDTH,GAME_SETTINGS.BORDER_WIDTH);
  }

  function drawNet(){
    var num = 10;
    var height = GAME_SETTINGS.HEIGHT/((num+1)*2);
    var y = height/2;
    var x = (GAME_SETTINGS.WIDTH-GAME_SETTINGS.NET.WIDTH)/2;
    ctx.fillStyle = "#000000";
    while(y < GAME_SETTINGS.HEIGHT){
        ctx.fillRect(x,y,GAME_SETTINGS.NET.WIDTH,height);
        y += height*2;
    }
  }