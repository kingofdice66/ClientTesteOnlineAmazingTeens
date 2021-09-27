import React from "react";
import ReactDOM from "react-dom";
import UserMainPage from "../components/MainPage";
import "normalize.css";

function UsersAccount(): JSX.Element {
    return (
        <>
            <UserMainPage />
        </>
    );
}

ReactDOM.render(<UsersAccount />, document.getElementById("usersAccount"));
