import React from "react";
import ReactDOM from "react-dom";
import Main from "../components/Main";
import Facade from "../../pageFacade/Facade";
// import TopNavBar from "../../topNavBar/TopNavBar";
// import Footer from "../../footer/Footer";
// import "./MakeCourse.scss";
import "normalize.css";

function MakeCourse(): JSX.Element {
  return (
    <>
      {/* <div className="makeCourse-wrapper">
                <div>
                    <TopNavBar />
                </div>
                <div>
                    <Main />
                </div>
                <div>
                    <Footer />
                </div>
            </div> */}
      <Facade Component={Main} />
    </>
  );
}

ReactDOM.render(<MakeCourse />, document.getElementById("makeCourse"));
