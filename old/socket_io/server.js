"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/newline-after-import */
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var send_notification_1 = require("./modules/send_notification");
var get_and_decode_jwt_cookie_1 = require("./modules/get_and_decode_jwt_cookie");
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
// --------------------------------------------------------------------
// Send a notification to a respective user.
// --------------------------------------------------------------------
// Send notification to a respective user when sender
// is sending a message, a chat request etc. to a specified receiver.
var notification = io.of("/notification");
notification.on("connection", function (socket) {
    (0, send_notification_1["default"])(socket, (0, get_and_decode_jwt_cookie_1["default"])(socket, cookie, jwt));
});
// --------------------------------------------------------------------
httpServer.listen(process.env.PORT, function () {
    console.log("socket.io connection established on port " + process.env.PORT);
});
