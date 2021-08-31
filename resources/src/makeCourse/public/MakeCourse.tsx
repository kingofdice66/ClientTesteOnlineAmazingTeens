import React from "react";
import ReactDOM from "react-dom";
import Form from "../components/MakeCourseForm";
import TopNavBar from "../../top-nav-bar/TopNavBar";
import Footer from "../../footer/Footer";
import "./MakeCourse.scss";
import "normalize.css";

function MakeCourse(): JSX.Element {
    return (
        <>
            <div className="makeCourse-wrapper">
                <div>
                    <TopNavBar />
                </div>
                <div>
                    <Form />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<MakeCourse />, document.getElementById("makeCourse"));
