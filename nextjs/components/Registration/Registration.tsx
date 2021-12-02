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

  // See if everything is ok when checking username input field.
  //! Attention: Should be false by default. Reason: waiting for axios.
  const [usernameOK, setUsernameOK] = useState<boolean>(false);

  // See if everything is ok when checking email input field.
  //! Attention: Should be false by default. Reason: waiting for axios.
  const [emailOK, setEmailOK] = useState<boolean>(false);

  // See if everything is ok when checking password.
  //! Attention: Should be false by default.
  const [passwordOK, setPasswordOK] = useState<boolean>(false);

  /** Check if username already exists in database and also for input errors. */
  const checkUsername = (): void => {
    const username = userInfo.username.trim(); // First trim the text.
    let usernameAvailability = true; // Check if username exists in database. Default to true.

    axios
      .post(`${apiURL}/checkUsernameAvailability`, { username })
      .then((res: any) => {
        // Check if the username exists in database.
        if (res.data.exists === true) {
          usernameAvailability = false;
        }

        if (!usernameAvailability) {
          setInputError((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.username = (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Numele nu este disponibil
              </span>
            );
            return { ...prevState };
          });
        } else if (!username.match(/^[a-zA-Z0-9_-]*$/)) {
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
                  John_Doe13, John123 etc.
                </span>
              </span>
            );
            return { ...prevState };
          });
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
        }
        // Username must be between 3 and 30 characters
        else if (!(username.length >= 3 && username.length <= 30)) {
          setInputError((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.username = (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Numele utilizatorului trebuie <br />
                sa conțină intre 3 si 30 caractere
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
        setUsernameOK(true);
      })
      .catch((err: any) => console.error(err));
  };

  const checkEmail = (): void => {
    const email = userInfo.email.trim(); // First trim the text.
    let emailAvailability = true; // Check if the email already exists in database. Default is true.

    axios
      .post(`${apiURL}/checkEmailAvailability`, { email })
      .then((res: any) => {
        // Check if the email already exists in database.
        if (res.data.exist === true) {
          emailAvailability = false;
        }

        if (!emailAvailability) {
          setInputError((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.email = (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Adresa de email exista deja
              </span>
            );
            return { ...prevState };
          });
        }
        // Check if the field contains an '@' as all emails should.
        else if (!email.match(/@/)) {
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
        }
        // Else just set it to null.
        else {
          setInputError((prevState) => {
            // eslint-disable-next-line no-param-reassign
            prevState.email = "";
            return { ...prevState };
          });
          setEmailOK(true);
        }
      })
      .catch((err: any) => console.error(err));
  };

  const checkPassword = (): void => {
    const passwordLength = userInfo.password.length;

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
    }
    // Password length must be between 8 and 30 characters long. Interval[8, 30]
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
    } else {
      setInputError((prevState) => {
        // eslint-disable-next-line no-param-reassign
        prevState.passwordMatch = "";
        return { ...prevState };
      });
      setPasswordOK(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    checkUsername();
    checkEmail();
    checkPassword();

    // If there are no errors in the input field, submit data.
    if (usernameOK && emailOK && passwordOK) {
      console.log("form sumbitted");

      const data = {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
      };

      axios
        .post(`${apiURL}/registerUsers`, data)
        .then((res: any) => console.log("res: ", res.data))
        .catch((err: any) => console.error(err));
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
          onBlur={checkUsername}
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
          onBlur={checkEmail}
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
          onBlur={checkPassword}
        />
      </label>
      <br />
      <div>{inputError.passwordMatch}</div>

      {/* prettier-ignore */}
      <button type="submit">Înregistreaza-mă</button>
    </form>
  );
}

export default Registration;
