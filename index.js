const express = require("express");

const app = express();

const PORT = process.env.PORT || 80;

const socket = require("socket.io");

const server = app.listen(PORT, () => {
  console.log("server is listening on port: " + PORT);
});

// Static files
app.use(express.static("public"));

//Socket setup
const io = socket(server);

io.on("connection", socket => {
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
