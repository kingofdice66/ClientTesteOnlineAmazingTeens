// This is the top navigation bar menu

import React from "react";
import "./TopNavBar.scss";

function TopNavBar(): JSX.Element {
  return (
    <>
      <div className="topNavBar">
        <div>
          <a href="##" className="logo">
            AMAZING TEENS
          </a>
        </div>
        <nav className="linksWrapper">
          <div className="links">
            <a href="##">
              <div>
                <span className="TEST">Acasă</span>
              </div>
            </a>
            <a href="##">
              <div>
                <span>Cursuri</span>
              </div>
            </a>
            <a href="./ContactForm.html">
              <div>
                <span>Contactează-ne</span>
              </div>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default TopNavBar;
