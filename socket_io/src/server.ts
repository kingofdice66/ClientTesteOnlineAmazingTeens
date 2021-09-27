import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3000;
const httpServer = createServer();
const io = new Server(httpServer, {
    /* options */
    cors: {
        origin: "*",
    },
});

httpServer.listen(PORT, () => {
    console.log(
        `socket.io connection to port ${PORT} has been established ...`
    );
});
