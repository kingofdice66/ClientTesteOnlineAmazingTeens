import { useEffect, useState } from "react";
import io from "socket.io-client";

// prettier-ignore
const socket = io(
  "http://localhost:5000/notification", 
  {withCredentials: true,}
);

function UsersAccount(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    socket.on("getNotification", (msg: string) => {
      setCount((prevState) => prevState + 1);
      console.log(msg);
    });
  }, []);

  const send = (): void => {
    socket.emit("sendNotification", "Razvan");
  };

  return (
    <>
      <div>UsersAccount</div>
      <div>Count:{count}</div>
      <button type="button" onClick={send}>
        SEND
      </button>
    </>
  );
}

export default UsersAccount;
