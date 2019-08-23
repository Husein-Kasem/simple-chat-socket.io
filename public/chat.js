// Make connection with the server
const socket = io.connect("http://localhost:80");

// query DOM
let message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  sendBtn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// setting the event handlers

sendBtn.addEventListener("click", event => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener("keypress", event => {
  socket.emit("typing", {
    handle: handle.value
  });
});

// listen for events
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}: </strong> ${
    data.message
  }</p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p><em>${data.handle}</em> is typing a message...</p>`;
});
