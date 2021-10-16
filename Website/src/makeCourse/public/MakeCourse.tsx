// this page is for making courses along with chapters.

import React from "react";
import ReactDOM from "react-dom";
import Main from "../components/Main";
import NavBarFooter from "../../navBarFooter/NavBarFooter";
import "normalize.css";

function MakeCourse(): JSX.Element {
  return (
    <>
      <NavBarFooter Component={Main} />
    </>
  );
}

ReactDOM.render(<MakeCourse />, document.getElementById("makeCourse"));
