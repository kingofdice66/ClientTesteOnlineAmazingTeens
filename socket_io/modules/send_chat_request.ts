// Send a chat request notification to a specific user in order
// for both parties to talk to one another.
// Receiver can accept, reject or block the users request.
// If the receiver blocks the request, subsequent requests
// cannot go through anymore.

// prettier-ignore
/** Send chat request to specified user */
const sendChatRequest = (sendChatRqst: any, room: string, jwtCookie: any): void => {
  // TODO: Don't forget to specify condition like if the jwt
  // TODO: has no errors, is not expired etc.
  // TODO: example:
  // TODO: if(are_no_errors), if(not_expired) etc.
  // TODO: if conditions are met, only then send request

  // "receivedChatRequest" because the other user has to receive the request
  sendChatRqst.to(room).on("receivedChatRequest", (msg: string) => {
    console.log(msg);
  });
};

export default sendChatRequest;
