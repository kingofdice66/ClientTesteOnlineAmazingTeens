import React from "react";
import ReactDOM from "react-dom";
import Chapters from "../components/Chapters";
import Facade from "../../pageFacade/Facade";
import "normalize.css";

function CourseChapters(): JSX.Element {
  return (
    <>
      <Facade Component={Chapters} />
    </>
  );
}

ReactDOM.render(<CourseChapters />, document.getElementById("courseChapters"));
