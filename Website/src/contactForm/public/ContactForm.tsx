// This is used to send email messages to the sites owner. Like, for example,
// how to sign up to the course and payments.

import React from "react";
import ReactDOM from "react-dom";
import Form from "../components/Form";
import Facade from "../../pageFacade/Facade";
import "normalize.css";

function ContactForm(): JSX.Element {
  return (
    <>
      <Facade Component={Form} />
    </>
  );
}

ReactDOM.render(<ContactForm />, document.getElementById("contactForm"));
