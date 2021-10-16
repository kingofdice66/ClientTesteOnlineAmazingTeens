// This contains the top navigation bar, footer and the appropriate component.

import React from "react";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";
import "./NavBarFooter.scss";

/**
 * @param {component} Component - A component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function NavBarFooter(props: any): JSX.Element {
  const { Component } = props;

  return (
    <div className="pageFacade-wrapper">
      <div>
        <TopNavBar />
      </div>
      <div className="pageFacade">
        <Component />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default NavBarFooter;
