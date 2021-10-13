import React from "react";
import ReactDOM from "react-dom";
import CoursesOffered from "../components/CoursesOffered";
import Facade from "../../pageFacade/Facade";
import "normalize.css";

function Courses(): JSX.Element {
  return (
    <>
      <Facade Component={CoursesOffered} />
    </>
  );
}

ReactDOM.render(<Courses />, document.getElementById("courses"));
