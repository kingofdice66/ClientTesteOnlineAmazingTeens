import React from "react";
import ReactDOM from "react-dom";
import About from "../components/About";
import TopNavBar from "../../top-nav-bar/TopNavBar";
import Footer from "../../footer/Footer";
import "./Index.css";
import "normalize.css";

function Index(): JSX.Element {
  return (
    <>
      <div className="main-page--wrapper">
        <div>
          <TopNavBar />
        </div>
        <div>
          <About />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById("index"));
