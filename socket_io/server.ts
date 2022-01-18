/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/newline-after-import */
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import sendNotification from "./modules/send_notification";
import getJWTCookie from "./modules/get_and_decode_jwt_cookie";
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

// --------------------------------------------------------------------
// Send a notification to a respective user.
// --------------------------------------------------------------------
// Send notification to a respective user when sender
// is sending a message, a chat request etc. to a specified receiver.
const notification = io.of("/notification");

notification.on("connection", (socket: any) => {
  sendNotification(socket, getJWTCookie(socket, cookie, jwt));
});
// --------------------------------------------------------------------

httpServer.listen(process.env.PORT, () => {
  console.log(`socket.io connection established on port ${process.env.PORT}`);
});
