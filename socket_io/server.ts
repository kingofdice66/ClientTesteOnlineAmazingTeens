import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 5000;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("custom-event", (msg, room) => {
    if (room === "") {
      io.emit("receive-message", msg);
    } else {
      socket.to(room).emit("receive-message", msg);
    }
    console.log(msg);
  });
});

httpServer.listen(PORT, () => {
  console.log(`socket.io connection established on port ${PORT}...`);
});
