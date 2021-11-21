import { useState } from "react";
import axios from "axios";

interface IUserInfo {
  username: string;
  password: string;
  email: string;
}

function Registration(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("form submitted");
  };

  return (
    <form onSubmit={(e): void => handleSubmit(e)}>
      <label htmlFor="username">
        Nume utilizator: <br />
        <input id="username" type="text" placeholder="username..." />
      </label>
      <br />

      <label htmlFor="email">
        EMail: <br />
        <input id="email" type="email" placeholder="adresa de email..." />
      </label>
      <br />
      

      <label htmlFor="password">
        Introdu parola: <br />
        <input id="password" type="password" placeholder="introdu parola..." />
      </label>
      <br />

      {/* prettier-ignore */}
      <label htmlFor="retypePassword">
        Reintrodu parola:<br />
        <input
          id="retypePassword"
          type="password"
          placeholder="reintrodu parola..."
        />
      </label>
      <br />

      <button type="submit">Înregistreaza-mă</button>
    </form>
  );
}

export default Registration;
