// This is the top navigation bar menu

import React from "react";
import "./TopNavBar.scss";

function TopNavBar(): JSX.Element {
  return (
    <>
      <div className="top-nav-bar">
        <div>
          <a href="##" className="tob-nav-bar--home-logo-link">
            AMAZING TEENS
          </a>
        </div>
        <nav className="top-nav-bar--links--wrapper">
          <div className="top-nav-bar--links">
            <a href="##" className="skew">
              <div className="skew--undo">
                <span className="style">Acasă</span>
              </div>
            </a>
            <a href="##" className="skew">
              <div className="skew--undo">
                <span className="style">Cursuri</span>
              </div>
            </a>
            <a href="##" className="skew">
              <div className="skew--undo">
                <span className="style">Contactează-ne</span>
              </div>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default TopNavBar;
