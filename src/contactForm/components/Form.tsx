import React, { useState } from "react";
import "./Form.scss";

interface IData {
  name: string;
  username: string; // Only if the user is registered.
  email: string;
  subject: string; // What is it about.
  message: string; // The message.
}

// Input errors
interface IErrorData {
  nameErrorInput: string;
  usernameErrorInput: string;
  emailErrorInput: string;
  subjectErrorInput: string;
  messageErrorInput: string;
}

function Form(): JSX.Element {
  const [data, setData] = useState<IData>({
    name: "",
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  /* ************************************************** */
  /*        Check for errors in input fields            */
  /* ************************************************** */
  //! Attention. Don't put these under an array form like for example:
  // ? const [data, setData] = useState({
  // ? usernameErrorInput: "",
  // ? emailErrorInput: "",
  // ? });
  //* because when you hit submit button, one of them will not
  //* get rendered on the page. Don't know why.
  const [nameErrorInput, setNameErrorInput] = useState<string>("");
  const [usernameErrorInput, setUsernameErrorInput] = useState<string>("");
  const [emailErrorInput, setEmailErrorInput] = useState<string>("");
  const [subjectErrorInput, setSubjectErrorInput] = useState<string>("");
  /* ************************************************** */

  const inputErrors = (): boolean => {
    let error = false; // error flag

    /* ************************************************** */
    /*            Check name input field                  */
    /* ************************************************** */
    const namePattern = /^[ ]*$/;
    if (data.name.length === 0 || namePattern.test(data.name)) {
      setNameErrorInput("Campul nu poate fi gol!");
      error = true;
    } else {
      setNameErrorInput("");
    }
    /* ************************************************** */
    /*            Check username input field              */
    /* ************************************************** */
    const usernamePatter = /^[ ]*$/;
    if (data.username.length === 0 || usernamePatter.test(data.username)) {
      setUsernameErrorInput("Campul nu poate fi gol!");
      error = true;
    } else {
      setUsernameErrorInput("");
    }
    /* ************************************************** */

    return error;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (inputErrors()) {
      // ...
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <div className="formFields-wrapper">
        <div className="formFields-centered">
          <div className="formFields">
            <form onSubmit={submit}>
              <label htmlFor="name">
                <span className="formFieldName-style">
                  Numele:<span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <input
                  type="text"
                  id="name"
                  className="formField-input"
                  onChange={(e): void =>
                    setData({ ...data, name: e.target.value })
                  }
                />
                <div>{nameErrorInput}</div>
              </label>
              <br />
              <br />
              <label htmlFor="username">
                <span className="formFieldName-style">Username:</span>
                <br />
                <input
                  type="text"
                  id="username"
                  className="formField-input"
                  onChange={(e): void =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                <div>{usernameErrorInput}</div>
              </label>
              <br />
              <br />
              <label htmlFor="email">
                <span className="formFieldName-style">
                  Adresa ta de email:
                  <span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <input
                  type="email"
                  id="email"
                  className="formField-input"
                  onChange={(e): void =>
                    setData({ ...data, email: e.target.value })
                  }
                />
              </label>
              <br />
              <br />
              <label htmlFor="subject">
                <span className="formFieldName-style">
                  Subiect:<span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <input
                  type="text"
                  id="subject"
                  className="formField-input"
                  onChange={(e): void =>
                    setData({ ...data, subject: e.target.value })
                  }
                />
              </label>
              <br />
              <br />
              <label htmlFor="message">
                <span className="formFieldName-style">
                  Întrebare/Mesaj:
                  <span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <textarea
                  id="message"
                  className="formField-textarea"
                  onChange={(e): void =>
                    setData({ ...data, message: e.target.value })
                  }
                />
              </label>
              <br />
              <br />
              <button
                type="submit"
                value="Trimite Email"
                className="formField-submitButton"
              >
                <span className="formField-submitButton-text">
                  Timite Email
                </span>
              </button>
            </form>
            <br />
            <div>
              <span className="formField-footerMessage">
                Toate câmpurile marcate cu
                <br />
                steluță roșie sunt obligatorii!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
