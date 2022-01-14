import { useState } from "react";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";

interface IUserInfo {
  username: string;
  password: string;
}

function Login(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("username: ", userInfo.username);
    console.log("password: ", userInfo.password);

    console.log("logged in");

    axios
      .post(
        `${apiURL}/loginUsers`,
        { username: userInfo.username, password: userInfo.password },
        { withCredentials: true }
      )
      .then((res: any) => {
        if (res.data.message === "incorrect") {
          setErrorMsg(
            <span style={{ color: "red", fontWeight: "bold" }}>
              Parola si/sau numele sunt <br />
              incorect introduse
            </span>
          );
        } else if (res.data.message === "email_not_confirmed") {
          setErrorMsg(
            <span style={{ color: "red", fontWeight: "bold" }}>
              Email-ul nu este confirmat
            </span>
          );
        } else {
          setErrorMsg("");
        }
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* prettier-ignore */}
      <label htmlFor="username">
        Nume utilizator:
        <br />
        <input
          type="text"
          placeholder="username..."
          value={userInfo.username}
          onChange={(e): void => setUserInfo({ ...userInfo, username: e.target.value })}
        />
      </label>
      <br />

      {/* prettier-ignore */}
      <label htmlFor="password">
        Introdu parola:
        <br />
        <input
          type="password"
          placeholder="parola..."
          value={userInfo.password}
          onChange={(e): void => setUserInfo({ ...userInfo, password: e.target.value })}
        />
      </label>

      <br />
      <div>{errorMsg}</div>
      <button type="submit">Intră în cont</button>
    </form>
  );
}

export default Login;
