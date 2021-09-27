import React from "react";
import ReactDOM from "react-dom";
import About from "../components/About";
import TopNavBar from "../../topNavBar/TopNavBar";
import Footer from "../../footer/Footer";
import "./Main.scss";
import "normalize.css";

function Main(): JSX.Element {
    return (
        <>
            <div className="mainPage-wrapper">
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

ReactDOM.render(<Main />, document.getElementById("main"));
