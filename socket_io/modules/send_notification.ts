// Send notification to a respective user when sender
// is sending a message, a chat request etc. to a specified receiver.

/** Send notification to specified user */
const sendNotification = (socket: any, jwtCookie: any): any => {
  // TODO: Don't forget to specify condition like if the jwt
  // TODO: has no errors, is not expired etc.
  // TODO: example:
  // TODO: if(are_no_errors), if(not_expired) etc.
  // TODO: if conditions are met, only then send request

  if (jwtCookie.err) {
    console.error(jwtCookie.err);
    return;
  }

  socket.join(jwtCookie.decoded.name); // The room name is the users username retrieved from the JWT cookie.

  // From the perspective of client not server
  // when using 'sendNotification' and 'getNotification'
  socket.on("sendNotification", (room: string) => {
    socket.to(room).emit("getNotification");
  });
};

export default sendNotification;
