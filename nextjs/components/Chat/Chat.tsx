import { useState } from "react";
import io from "socket.io-client";

// prettier-ignore
const socket = io(
  "http://localhost:5000/notification", 
  {withCredentials: true,}
);

socket.on("connect", () => {
  console.log("socket.io connection established");
  socket.on("chatMsg", (msg) => console.log("msg: ", msg));
});

function Chat(): JSX.Element {
  const [chatMsg, setChatMsg] = useState<string>("");

  const emit = (): void => {
    socket.emit("chatMsg", chatMsg);
  };

  return (
    <>
      <div>CHAT</div>
      Message&nbsp;
      <input
        type="text"
        value={chatMsg}
        onChange={(e): void => setChatMsg(e.target.value)}
      />
      {/* prettier-ignore */}
      <button type="button" onClick={emit}>SEND</button>
    </>
  );
}

export default Chat;
