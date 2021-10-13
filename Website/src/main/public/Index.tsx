import React from "react";
import ReactDOM from "react-dom";
import About from "../components/About";
import Facade from "../../pageFacade/Facade";
import "normalize.css";

function Index(): JSX.Element {
  return (
    <>
      <Facade Component={About} />
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById("index"));
