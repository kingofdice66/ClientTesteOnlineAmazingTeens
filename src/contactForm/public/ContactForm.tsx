// This is used to send messages to the sites owner. Like, for example,
// how to sign up to the course and payments.

import React from "react";
import ReactDOM from "react-dom";
import Form from "../components/Form";
import TopNavBar from "../../top-nav-bar/TopNavBar";
import Footer from "../../footer/Footer";
import "normalize.css";

function ContactForm(): JSX.Element {
  return (
    <>
      <div className="contactForm-mainPage--wrapper">
        <div>
          <TopNavBar />
        </div>
        <div>
          <Form />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<ContactForm />, document.getElementById("contact-form"));
