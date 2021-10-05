import React from "react";
import ReactDOM from "react-dom";
import Description from "../components/Description";
import TopNavBar from "../../topNavBar/TopNavBar";
import Footer from "../../footer/Footer";
import "./CourseDescription.scss";
import "normalize.css";

function CourseDescription(): JSX.Element {
    return (
        <>
            <div className="courseDescription-wrapper">
                <div>
                    <TopNavBar />
                </div>
                <div className="courseDescription">
                    <Description />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

ReactDOM.render(
    <CourseDescription />,
    document.getElementById("courseDescription")
);
