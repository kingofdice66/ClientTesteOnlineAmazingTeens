import React from "react";
import ReactDOM from "react-dom";
import UsersMainPage from "../components/MainPage";
import TopNavBar from "../../topNavBar/TopNavBar";
import Footer from "../../footer/Footer";
import "./UsersAccount.scss";
import "normalize.css";

function UsersAccount(): JSX.Element {
    return (
        <>
            <div className="usersAccount-wrapper">
                <div>
                    <TopNavBar />
                </div>
                <div className="usersMainPage">
                    <UsersMainPage />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<UsersAccount />, document.getElementById("usersAccount"));
