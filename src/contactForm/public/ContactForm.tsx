// This is used to send messages to the sites owner. Like, for example,
// how to sign up to the course and payment.

import React from "react";
import ReactDOM from "react-dom";
import Form from "../components/Form";

function ContactForm(): JSX.Element {
  return (
    <>
      <Form />
    </>
  );
}

ReactDOM.render(<ContactForm />, document.getElementById("contact-form"));
