import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import Form from "../components/MakeCourseForm";

function MakeCourse(): JSX.Element {
    return (
        <>
            <Form />
        </>
    );
}

ReactDOM.render(<MakeCourse />, document.getElementById("makeCourse"));
