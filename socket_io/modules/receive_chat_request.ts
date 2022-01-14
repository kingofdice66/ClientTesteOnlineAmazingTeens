// Receive a chat request from a specific user.
// Receiver can accept, reject or block the users request.
// If the receiver blocks the request, subsequent requests
// cannot go through anymore.
// prettier-ignore
const receiveChatRequest = (receiveChatRqst: any, room: any, jwtCookie: any): void => {
  // TODO: Don't forget to specify condition like if the jwt
  // TODO: has no errors, is not expired etc.
  // TODO: example:
  // TODO: if(are_no_errors), if(not_expired) etc.
  // TODO: if conditions are met, only then receive request

  // "sentChatRequest" because the other user has to send a chat request
  receiveChatRqst.to(room).on("sentChatRequest", (msg: any) => {
    console.log(msg)
  });
};

export default receiveChatRequest;
