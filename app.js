var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile('try.html');
})

const port=process.env.PORT || 5000;
var server = app.listen( port ,()=>{
    console.log("Server running on port "+port);
});
var io = require('socket.io')(server);

users = [];


io.on('connection', function(socket) {   
   console.log("New Connection");
   var roomId='';
   socket.on('connectToRoom',function(data){
       roomId=data;       
       socket.join(roomId);
       io.sockets.in(roomId).emit('connectedToRoom', "You are in room: "+roomId);       
       console.log('A user connected in room: '+roomId);
   })

   socket.on('setUsername', function(data) {      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {            
      io.sockets.in(roomId).emit('newmsg', data);      
   })

   socket.on('leave',function(data){
      socket.leave(roomId);
      console.log("Leaving...")
   })
});
