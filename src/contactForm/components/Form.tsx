import React, { useState } from "react";

interface IData {
  name: string;
  learnerUsername: string; // Only if the user is registered.
  email: string;
  subject: string; // What is it about.
  message: string; // The message.
}

function Form(): JSX.Element {
  const [data, setData] = useState<IData>({
    name: "",
    learnerUsername: "",
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
      <form onSubmit={submit}>
        <label htmlFor="name">
          Name:
          <br />
          <input type="text" id="name" />
        </label>
        <label htmlFor="learnerUsername">
            Learner Username:
            <br/>
            <input type="text"  id="learnerUsername" />
        </label>
      </form>
    </>
  );
}

export default Form;
