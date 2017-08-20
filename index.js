const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const serverPort = process.env.PORT || '3000';

const thingList = require("./things").things;

server.listen(serverPort, function () {
  console.log('App listening on port ' + serverPort);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'site/index.html'));
})

app.get('/things', (req, res) => {
  res.send(JSON.stringify(thingList));
})

app.get('/host', (req, res) => {
  res.sendFile(path.join(__dirname, 'site/host.html'));
})

var users = [];

io.on('connection', function (socket) {

  socket.on('join-as', data => {
    if(users.indexOf(data.username) < 0) {
      users.push(data.username)
      socket.emit('user-join-response', {
        username: data.username,
        status: 'success'
      })
    } else {
      socket.emit('user-join-response', {
        status: 'failure'
      })
    }
  });


  socket.on('remove-user', data => {
    const deadUserIndex = users.indexOf(data.username);
    if(deadUserIndex > -1) {
      users.splice(deadUserIndex, 1);
      socket.emit('removed-user', {
        username: data.username,
        status: 'success'
      })
    } else {
      socket.emit('removed-user', {
        username: username,
        status: 'failure'
      })
    }
  });

});

