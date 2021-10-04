import React from "react";
import ReactDOM from "react-dom";
import CourseChapters from "../components/CourseChapters";
import "normalize.css";

function Chapters(): JSX.Element {
    return <CourseChapters />;
}

ReactDOM.render(<Chapters />, document.getElementById("chapters"));
