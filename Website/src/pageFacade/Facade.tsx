// This contains the top navigation bar, footer and the appropriate component.

import React from "react";
import TopNavBar from "../topNavBar/TopNavBar";
import Footer from "../footer/Footer";
import "./Facade.scss";

/**
 * @param {component} Component - A component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Facade(props: any): JSX.Element {
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

export default Facade;
