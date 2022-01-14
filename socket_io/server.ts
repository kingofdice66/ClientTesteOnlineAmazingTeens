/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/newline-after-import */
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import sendChatRequest from "./modules/send_chat_request";
import receiveChatRequest from "./modules/receive_chat_request";
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
// ####                     GET AND DECODE JWT COOKIE                   ####
// #########################################################################
/** Get and decode JWT cookie. */
const getJWTCookie = (socket: any): { err: any; decoded: any } => {
  // get cookies
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");

  // prettier-ignore
  // decoded JWT cookie
  const jwtCookie = jwt.verify(cookies.jwt, process.env.JWT_KEY, (err: any, decoded: any) => ({err, decoded}))

  return jwtCookie;
};

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
  sendChatRequest(sendChatRqst, getJWTCookie(socket));
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
  receiveChatRequest(receiveChatRqst, getJWTCookie(socket));
});
// #########################################################################

httpServer.listen(process.env.PORT, () => {
  console.log(`socket.io connection established on port ${process.env.PORT}`);
});
