// prettier-ignore
/** Get and decode JWT cookie. */
const getJWTCookie = (socket: any, cookie: any, jwt:any): { err: any; decoded: any } => {
  // get cookies
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");

  // prettier-ignore
  // decode JWT cookie and send the errors if they exist along with the decoded JWT "{err, decoded}"
  const jwtCookie = jwt.verify(cookies.jwt, process.env.JWT_KEY, (err: any, decoded: any) => ({err, decoded}))

  return jwtCookie;
};

export default getJWTCookie;
