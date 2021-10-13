import React from "react";
import ReactDOM from "react-dom";
import UsersMainPage from "../components/MainPage";
import Facade from "../../pageFacade/Facade";
import "normalize.css";

function UsersAccount(): JSX.Element {
  return (
    <>
      <Facade Component={UsersMainPage} />
    </>
  );
}

ReactDOM.render(<UsersAccount />, document.getElementById("usersAccount"));
