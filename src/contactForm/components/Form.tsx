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
    console.log("data: ", data);
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
                  type="text"
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
              <div className="formField-submitButton-wrapper">
                <button
                  type="submit"
                  value="Trimite Email"
                  className="formField-submitButton"
                >
                  <span className="formField-submitButton-text">
                    Timite Email
                  </span>
                </button>
              </div>
            </form>
            <br />
            <div>
              Toate câmpurile marcate cu
              <br />
              steluță roșie sunt obligatorii!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
