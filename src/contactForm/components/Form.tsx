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
                Numele:
                <br />
                <input type="text" id="name" />
              </label>
              <br />
              <br />
              <label htmlFor="username">
                Username:
                <br />
                <input type="email" id="username" />
              </label>
              <br />
              <br />
              <label htmlFor="email">
                Adresa ta de email:
                <br />
                <input type="text" id="email" />
              </label>
              <br />
              <br />
              <label htmlFor="subject">
                Subiect:
                <br />
                <input type="text" id="subject" />
              </label>
              <br />
              <br />
              <label htmlFor="message">
                Întrebare/Mesaj:
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
