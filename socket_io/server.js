"use strict";
exports.__esModule = true;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var PORT = 5000;
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: { origin: "http://localhost:3000" }
});
io.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("custom-event", function (msg, room) {
        if (room === "") {
            io.emit("receive-message", msg);
        }
        else {
            socket.to(room).emit("receive-message", msg);
        }
        console.log(msg);
    });
});
httpServer.listen(PORT, function () {
    console.log("socket.io connection established on port " + PORT + "...");
});
