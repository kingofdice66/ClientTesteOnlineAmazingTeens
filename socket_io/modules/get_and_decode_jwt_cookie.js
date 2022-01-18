"use strict";
exports.__esModule = true;
// prettier-ignore
/** Get and decode JWT cookie. */
var getJWTCookie = function (socket, cookie, jwt) {
    // get cookies
    var cookies = cookie.parse(socket.handshake.headers.cookie || "");
    // prettier-ignore
    // decode JWT cookie and send the errors if they exist along with the decoded JWT "{err, decoded}"
    var jwtCookie = jwt.verify(cookies.jwt, process.env.JWT_KEY, function (err, decoded) { return ({ err: err, decoded: decoded }); });
    return jwtCookie;
};
exports["default"] = getJWTCookie;
