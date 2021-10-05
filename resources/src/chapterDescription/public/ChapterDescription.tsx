import React from "react";
import ReactDOM from "react-dom";
import Description from "../components/Description";
import TopNavBar from "../../topNavBar/TopNavBar";
import Footer from "../../footer/Footer";
import "./ChapterDescription.scss";
import "normalize.css";

function ChapterDescription(): JSX.Element {
    return (
        <>
            <div className="chapterDescription-wrapper">
                <div>
                    <TopNavBar />
                </div>
                <div className="chapterDescription">
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
    <ChapterDescription />,
    document.getElementById("chapterDescription")
);
