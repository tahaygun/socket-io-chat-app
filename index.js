const express = require("express");
const socket = require("socket.io");
var app = express();

var server = app.listen(3000, () => {
  console.log("Listening...");
});

app.use(express.static("public"));

//socket setup
var io = socket(server);
var counter = 0;
io.on("connection", socket => {
  counter++;
  console.log(counter);
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("users", () => {
    io.sockets.emit("users", counter);
  });
  socket.on("disconnect", () => {
    counter--;
    io.sockets.emit("users", counter);
  });
});
