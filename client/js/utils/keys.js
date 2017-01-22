var game = require('../game.js');
module.exports = {

    onkeydown: function(event){
        if(event.keyCode === 83)   //s
            game.socket.emit('keyPress',{inputId:'down',state:true});
        else if(event.keyCode === 87) // w
            game.socket.emit('keyPress',{inputId:'up',state:true});
    },

    onkeyup: function(event){
        if(event.keyCode === 83)   //s
            game.socket.emit('keyPress',{inputId:'down',state:false});
        else if(event.keyCode === 87) // w
            game.socket.emit('keyPress',{inputId:'up',state:false});
    }
};