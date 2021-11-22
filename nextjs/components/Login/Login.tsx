import { useState } from "react";
import axios from "axios";

interface IUserInfo {
  username: string;
  password: string;
}

function Login(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("username: ", userInfo.username);
    console.log("password: ", userInfo.password);

    console.log("logged in");
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

      <button type="submit">Intră în cont</button>
    </form>
  );
}

export default Login;
