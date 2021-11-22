import { useState } from "react";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";

interface IUserInfo {
  username: string;
  password: string;
  retypePassword: string;
  email: string;
}

function Registration(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
    retypePassword: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("username: ", userInfo.username);
    console.log("password: ", userInfo.password);
    console.log("retypePassword: ", userInfo.retypePassword);
    console.log("email: ", userInfo.email);
    console.log("form submitted");

    const data = {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
    };

    console.log("data: ", data);

    axios
      .post(`${apiURL}/setUsers`, data)
      .then((res: any) => console.log("res: ", res.data))
      .catch((err: any) => console.error(err));
  };

  return (
    <form onSubmit={(e): void => handleSubmit(e)}>
      {/* prettier-ignore */}
      <label htmlFor="username">
        Nume utilizator: <br />
        <input
          id="username"
          type="text"
          placeholder="username..."
          value={userInfo.username}
          onChange={(e): void => setUserInfo({ ...userInfo, username: e.target.value })}
        />
      </label>
      <br />

      {/* prettier-ignore */}
      <label htmlFor="email">
        Email: <br />
        <input 
          id="email" 
          type="email" 
          placeholder="adresa de email..." 
          value={userInfo.email}
          onChange={(e): void => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </label>
      <br />

      {/* prettier-ignore */}
      <label htmlFor="password">
        Introdu parola: <br />
        <input 
          id="password" 
          type="password" 
          placeholder="parola..." 
          value={userInfo.password}
          onChange={(e): void => setUserInfo({ ...userInfo, password: e.target.value })}
        />
      </label>
      <br />

      {/* prettier-ignore */}
      <label htmlFor="retypePassword">
        Reintrodu parola:<br />
        <input
          id="retypePassword"
          type="password"
          placeholder="reintrodu parola..."
          value={userInfo.retypePassword}
          onChange={(e): void => setUserInfo({ ...userInfo, retypePassword: e.target.value })}
        />
      </label>
      <br />

      <button type="submit">Înregistreaza-mă</button>
    </form>
  );
}

export default Registration;
