import { useState } from "react";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";

interface IUserInfo {
  username: string;
  password: string;
  retypedPassword: string;
  email: string;
}

interface IInputError {
  username: any;
  passwordMatch: any;
  email: any;
}

function Registration(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: "",
    password: "",
    retypedPassword: "",
    email: "",
  });

  const [inputError, setInputError] = useState<IInputError>({
    username: "",
    passwordMatch: "",
    email: "",
  });

  /** Check if the input fields are correct. */
  const checkInput = (): boolean => {
    let boolFlag = true;

    // ####################################################
    // #######        CHECK USERNAME FIELD          #######
    // ####################################################

    const username = userInfo.username.trim(); // First trim the text.

    // Check for appropriate characters.
    if (!username.match(/^[a-zA-Z0-9_-]*$/)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.username = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Caracterele acceptate sunt &nbsp;
            <span style={{ color: "blue", fontWeight: "bold" }}>
              a-zA-Z0-9_- <br />
              Exemplu:
              <br />
              JohnDoe, John-Doe, <br />
              John_Doe1, John123 etc.
            </span>
          </span>
        );
        return { ...prevState };
      });
      boolFlag = false;
    }
    // Check if the field is empty.
    else if (username.match(/^[ ]*$/)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.username = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Câmpul nu poate fi gol
          </span>
        );
        return { ...prevState };
      });
      boolFlag = false;
    }
    // Username must be between 3 and 30 characters
    else if (!(username.length >= 3 && username.length <= 30)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.username = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Numele utilizatorului trebuie <br />
            sa contină intre 3 si 30 caractere
          </span>
        );
        return { ...prevState };
      });
    }
    // Else just set it to ""
    else {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.username = "";
        return { ...prevState };
      });
    }

    // ####################################################
    // #######           CHECK EMAIL FIELD          #######
    // ####################################################

    const email = userInfo.email.trim(); // First trim the text.

    // Check if the field contains an '@' as all emails should.
    if (!email.match(/@/)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.email = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Adresa de email nu este corect introdusă <br />
            Trebuie sa conțină un @
          </span>
        );
        return { ...prevState };
      });
      boolFlag = false;
    }
    // Else just set it to null.
    else {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.email = "";
        return { ...prevState };
      });
    }

    // ####################################################
    // ####            VERIFY PASSWORD FIELD           ####
    // ####################################################

    const passwordLength = userInfo.password.length;
    const { password } = userInfo;

    // Verify if password and retyped password fields are equal.
    if (userInfo.password !== userInfo.retypedPassword) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.passwordMatch = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Parola nu se potrivește
          </span>
        );
        return { ...prevState };
      });
      boolFlag = false;
    }
    // Password length must be between 6 and 30 characters long. Interval[3, 30]
    else if (!(passwordLength >= 8 && passwordLength <= 30)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.passwordMatch = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Parola trebuie sa conțină <br />
            între 8 si 30 caractere
          </span>
        );
        return { ...prevState };
      });
      boolFlag = false;
    } else if (password.match(/^[ ]*$/)) {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.passwordMatch = (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Câmpul nu poate fi gol
          </span>
        );
        return { ...prevState };
      });
    } else {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.passwordMatch = "";
        return { ...prevState };
      });
    }
    // ####################################################

    return boolFlag;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("username: ", userInfo.username);
    console.log("password: ", userInfo.password);
    console.log("retypePassword: ", userInfo.retypedPassword);
    console.log("email: ", userInfo.email);
    console.log("form submitted");

    const data = {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
    };

    console.log("data: ", data);

    if (checkInput()) {
      // axios
      //   .post(`${apiURL}/registerUsers`, data)
      //   .then((res: any) => console.log("res: ", res.data))
      //   .catch((err: any) => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div>{inputError.username}</div>

      {/* prettier-ignore */}
      <label htmlFor="email">
        Email: <br />
        <input 
          id="email" 
          type="text" 
          placeholder="adresa de email..." 
          value={userInfo.email}
          onChange={(e): void => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </label>
      <br />
      <div>{inputError.email}</div>

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
          placeholder="parola..."
          value={userInfo.retypedPassword}
          onChange={(e): void => setUserInfo({ ...userInfo, retypedPassword: e.target.value })}
        />
      </label>
      <br />
      <div>{inputError.passwordMatch}</div>

      <button type="submit">Înregistreaza-mă</button>
    </form>
  );
}

export default Registration;
