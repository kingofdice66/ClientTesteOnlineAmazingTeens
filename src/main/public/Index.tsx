import React from "react";
import ReactDOM from "react-dom";
import About from "../components/About";
import TopNavBar from "../../top-nav-bar/TopNavBar";
import "normalize.css";

function Index(): JSX.Element {
  return (
    <>
      <TopNavBar />
      <About />
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById("index"));
