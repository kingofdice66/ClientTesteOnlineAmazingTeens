import React from "react";
import ReactDOM from "react-dom";
import Panel from "../components/Panel";
import NavBarFooter from "../../navBarFooter/NavBarFooter";
import "normalize.css";

function OwnerAdminPanel(): JSX.Element {
  return (
    <>
      <NavBarFooter Component={Panel} />
    </>
  );
}

ReactDOM.render(
  <OwnerAdminPanel />,
  document.getElementById("ownerAdminPanel")
);
