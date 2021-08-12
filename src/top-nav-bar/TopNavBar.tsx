// This is the top navigation bar menu

import React from "react";
import "./TopNavBar.css";

function TopNavBar(): JSX.Element {
  return (
    <>
      <div className="top-nav-bar">
        <nav className="top-nav-bar--links">
          <div>
            <a href="##" className="tob-nav-bar--home-link">
              AMAZING TEENS
            </a>
          </div>
          <div>
            <a href="##" className="top-nav-bar--link">
              Link1
            </a>
          </div>
          <div>
            <a href="##" className="top-nav-bar--link">
              Link2
            </a>
          </div>
          <div>
            <a href="##" className="top-nav-bar--link">
              Link3
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default TopNavBar;
