// This page contain courses.

import React from "react";
import ReactDOM from "react-dom";
import CoursesOffered from "../components/CoursesOffered";
import NavBarFooter from "../../navBarFooter/NavBarFooter";
import "normalize.css";

function Courses(): JSX.Element {
  return (
    <>
      <NavBarFooter Component={CoursesOffered} />
    </>
  );
}

ReactDOM.render(<Courses />, document.getElementById("courses"));
