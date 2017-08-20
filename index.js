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
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('join-as', data => {

  });
});

