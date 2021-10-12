import React from "react";
import ReactDOM from "react-dom";
import TopNavBar from "../../topNavBar/TopNavBar";
import Footer from "../../footer/Footer";
import CoursesOffered from "../components/CoursesOffered";
import "./Courses.scss";
import "normalize.css";

function Courses(): JSX.Element {
  return (
    <>
      <div className="courses-wrapper">
        <div>
          <TopNavBar />
        </div>
        <div className="coursesOffered">
          <CoursesOffered />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<Courses />, document.getElementById("courses"));
