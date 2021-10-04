import React from "react";
import ReactDOM from "react-dom";
import CourseChapters from "../components/CourseChapters";
import TopNavBar from "../../topNavBar/TopNavBar";
import Footer from "../../footer/Footer";
import "./Chapters.scss";
import "normalize.css";

function Chapters(): JSX.Element {
    return (
        <>
            <div className="chapters-wrapper">
                <div>
                    <TopNavBar />
                </div>
                <div className="chapters">
                    <CourseChapters />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<Chapters />, document.getElementById("chapters"));
