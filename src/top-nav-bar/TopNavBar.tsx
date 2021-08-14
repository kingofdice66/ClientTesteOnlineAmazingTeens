// This is the top navigation bar menu

import React from "react";
import "./TopNavBar.css";

function TopNavBar(): JSX.Element {
  return (
    <>
      <div className="top-nav-bar">
        <div>
          <a href="##" className="tob-nav-bar--home-logo-link">
            AMAZING TEENS
          </a>
        </div>
        <nav className="top-nav-bar--links">
          <div>
            <a href="##" className="top-nav-bar--link link-style">
              Link1
            </a>
          </div>
          <div>
            <a href="##" className="top-nav-bar--link link-style">
              Link2
            </a>
          </div>
          <div>
            <a href="##" className="top-nav-bar--link link-style">
              Link3
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default TopNavBar;
