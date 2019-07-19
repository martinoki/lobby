import socketIOClient from "socket.io-client";

const socket = socketIOClient(
    'ws://localhost:3002',
    { transports: ['websocket'] });
export default socket;
  // socket.on("FromAPI", data => this.setState({ response: data }));