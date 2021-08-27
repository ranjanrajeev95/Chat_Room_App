var username;
var roomId;

var socket = io();



function set_username(){
    username=document.getElementById("username").value;    
    document.getElementById("username_wrapper").innerHTML="Welcome "+username;
    document.getElementById("input_wrapper").innerHTML='<label for="room_data">Enter RoomId:</label>\
    <input type="text" name="room_data" id="room_data" placeholder="Enter RoomId" class="form-control">\
    <br>\
    <button type="button" class="btn btn-default" name="room_data_btn" onclick="set_room()">\
       Submit\
    </button>';
    socket.emit('setUsername', username);
}

function set_room(){
    roomId=document.getElementById("room_data").value;
    document.getElementById("room_data_wrapper").innerHTML="RoomId: "+roomId;
    document.getElementById("input_wrapper").innerHTML='<br>\
    <button type="button" class="btn btn-danger" name="leave_btn" onclick="leave()">\
    Leave\
 </button>';
    socket.emit('connectToRoom',roomId);
}

function sendMessage() {
    var msg = document.getElementById('message').value;
    document.getElementById('message').value='';
    if(msg) {
       socket.emit('msg', {message: msg, user: user});
    }
 }

 function leave(){
    if (confirm("Are you sure?")) {
        socket.emit('leave',roomId);
        document.getElementById('message-container').innerHTML='';
        document.getElementById('room_data_wrapper').innerHTML='';
        document.getElementById("input_wrapper").innerHTML='<label for="room_data">Enter RoomId:</label>\
    <input type="text" name="room_data" id="room_data" placeholder="Enter RoomId" class="form-control">\
    <br>\
    <button type="button" class="btn btn-default" name="room_data_btn" onclick="set_room()">\
       Submit\
    </button>';
    } 
    else {
        
    }
 }

 socket.on('connectedToRoom',(data)=>{
    alert(data);
 })
 socket.on('userExists', function(data) {
    document.getElementById('error-container').innerHTML = data;
 });
 var user;     
 socket.on('userSet', function(data) {
    user=data.username;
 }) 
 socket.on('newmsg', function(data) {
    if(user) {
       document.getElementById('message-container').innerHTML += '<div><b>' + 
          data.user + '</b>: ' + data.message + '</div>'
    }
 })