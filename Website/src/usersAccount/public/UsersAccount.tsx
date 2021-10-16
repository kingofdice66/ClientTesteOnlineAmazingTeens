import React from "react";
import ReactDOM from "react-dom";
import UsersMainPage from "../components/MainPage";
import NavBarFooter from "../../navBarFooter/NavBarFooter";
import "normalize.css";

function UsersAccount(): JSX.Element {
  return (
    <>
      <NavBarFooter Component={UsersMainPage} />
    </>
  );
}

ReactDOM.render(<UsersAccount />, document.getElementById("usersAccount"));
