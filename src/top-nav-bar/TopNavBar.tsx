// This is the top navigation bar menu

import React from "react";
import "./TopNavBar.css";

function TopNavBar(): JSX.Element {
  return (
    <>
      <div className="top-nav-bar">
        <div className="top-nav-bar--links">
          <div>AMAZING TEENS</div>
          <div>Link1</div>
          <div>Link2</div>
          <div>Link3</div>
        </div>
      </div>
    </>
  );
}

export default TopNavBar;
