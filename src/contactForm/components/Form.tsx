import React, { useState } from "react";
import "./Form.scss";

interface IData {
  name: string;
  username: string; // Only if the user is registered.
  email: string;
  subject: string; // What is it about.
  message: string; // The message.
}

function Form(): JSX.Element {
  const [data, setData] = useState<IData>({
    name: "",
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("form submitted");
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
                <input type="text" id="name" />
              </label>
              <br />
              <br />
              <label htmlFor="username">
                <span className="formFieldName-style">Username:</span>
                <br />
                <input type="email" id="username" />
              </label>
              <br />
              <br />
              <label htmlFor="email">
                <span className="formFieldName-style">
                  Adresa ta de email:
                  <span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <input type="text" id="email" />
              </label>
              <br />
              <br />
              <label htmlFor="subject">
                <span className="formFieldName-style">
                  Subiect:<span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <input type="text" id="subject" />
              </label>
              <br />
              <br />
              <label htmlFor="message">
                <span className="formFieldName-style">
                  Întrebare/Mesaj:
                  <span style={{ color: "red", fontSize: 25 }}>*</span>
                </span>
                <br />
                <textarea id="message" />
              </label>
              <br />
              <br />
              <input type="submit" value="Trimite Email" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
