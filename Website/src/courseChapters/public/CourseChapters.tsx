import React from "react";
import ReactDOM from "react-dom";
import Chapters from "../components/Chapters";
import NavBarFooter from "../../navBarFooter/NavBarFooter";
import "normalize.css";

function CourseChapters(): JSX.Element {
  return (
    <>
      <NavBarFooter Component={Chapters} />
    </>
  );
}

ReactDOM.render(<CourseChapters />, document.getElementById("courseChapters"));
