import React from "react";
import ReactDOM from "react-dom";
import About from "../components/About";
import NavBarFooter from "../../navBarFooter/NavBarFooter";
import "normalize.css";

function Index(): JSX.Element {
  return (
    <>
      <NavBarFooter Component={About} />
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById("index"));
