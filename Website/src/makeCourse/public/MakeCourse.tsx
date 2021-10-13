// this page is for making courses along with chapters.

import React from "react";
import ReactDOM from "react-dom";
import Main from "../components/Main";
import Facade from "../../pageFacade/Facade";
import "normalize.css";

function MakeCourse(): JSX.Element {
  return (
    <>
      <Facade Component={Main} />
    </>
  );
}

ReactDOM.render(<MakeCourse />, document.getElementById("makeCourse"));
