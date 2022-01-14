/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/newline-after-import */
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import sendChatRequest from "./modules/send_chat_request";
import receiveChatRequest from "./modules/receive_chat_request";
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

// #########################################################################
// #####                      SEND CHAT REQUESTS                       #####
// #########################################################################
// Send a chat request notification to a specific user in order
// for both parties to talk to one another.
// Receiver can accept, reject or block the users request.
// If the receiver blocks the request, subsequent requests
// cannot go through anymore.
const sendChatRqst = io.of("/send_chat_request");

sendChatRqst.on("connection", (socket: any) => {
  const jwtCookie = getJWTCookie(socket, cookie, jwt);
  const room = jwtCookie.decoded.name; // the name of the room is the username

  sendChatRequest(sendChatRqst, room, jwtCookie);
});
// #########################################################################
// #####                      RECEIVE CHAT REQUESTS                    #####
// #########################################################################
// Receive a chat request from a specific user.
// Receiver can accept, reject or block the users request.
// If the receiver blocks the request, subsequent requests
// cannot go through anymore.
const receiveChatRqst = io.of("/receive_chat_request");

receiveChatRqst.on("connection", (socket: any) => {
  const jwtCookie = getJWTCookie(socket, cookie, jwt);
  const room = jwtCookie.decoded.name; // the name of the room is the username

  receiveChatRequest(receiveChatRqst, room, jwtCookie);
});
// #########################################################################

httpServer.listen(process.env.PORT, () => {
  console.log(`socket.io connection established on port ${process.env.PORT}`);
});
