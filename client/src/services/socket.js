import socketIO from "socket.io-client";
import { socketURLs } from "../constants";

// const socketServerURL = "http://127.0.01:8181";
// let socket;

// const connectSocket = () => {
//   socket = socketIO(socketServerURL);

//   socket.on("connect", () => {
//     console.log("connected");
//     socket.emit("clientAuth", "hijklm");
//   });
// };

// export default connectSocket;

class Socket {
  constructor(socketServerURL) {
    if (!socketServerURL) throw new Error("Socket server url is required");
    this.socketURL = socketServerURL;
    this.socket = null;
  }

  _connect() {
    this.socket = socketIO(this.socketURL);
    this.socket.on("connect", () => {
      console.log("connected");
      this.socket.emit("clientAuth", "hijklm");
    });
  }

  subscribe(key, cb) {
    if (!this.socket) this._connect();
    this.socket.on(key, cb);
  }
}

const perfSocket = new Socket(socketURLs.perfData);
perfSocket._connect();

export { perfSocket };
export default Socket;
