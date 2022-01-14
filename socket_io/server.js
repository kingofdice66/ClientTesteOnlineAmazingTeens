"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/newline-after-import */
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cookie = require("cookie");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
});
var notification = io.of("/notification"); // for notifications
notification.on("connection", function (socket) {
    // get cookies
    var cookies = cookie.parse(socket.handshake.headers.cookie || "");
    // make sure the JWT cookie exists
    if (cookies.jwt) {
        jwt.verify(cookies.jwt, process.env.JWT_KEY, function (err, decoded) {
            // make sure the JWT is valid, if not, return
            if (err) {
                console.error(err);
                return;
            }
            // Join room,  room=username. Username is encoded in JWT
            socket.join(decoded.name);
        });
    }
    // receive message then send it back to the appropriate room
    socket.on("chatMsg", function (msg) {
        console.log(msg);
        notification.to("Razvan").emit("chatMsg", msg);
    });
});
httpServer.listen(process.env.PORT, function () {
    console.log("socket.io connection established on port " + process.env.PORT);
});
