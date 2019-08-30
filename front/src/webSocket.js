import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:3000", { transports: ["websocket"] });
socket.on("connect", function() {
  console.log("connected!");
  socket.emit("greet", { message: "Hello Mr.Server!" });
});

socket.on("respond", function(data) {
  console.log(data);
});

// socket.on("refreshGame", function(data) {
//   console.log("ACAAAA");
// });

export default socket;
// socket.on("FromAPI", data => this.setState({ response: data }));
