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
            <a href="/" className="skew">
              <div className="skew-undo">
                <span className="styleLinkText">Acasă</span>
              </div>
            </a>
            <a href="./Courses.html" className="skew">
              <div className="skew-undo">
                <span className="styleLinkText">Cursuri</span>
              </div>
            </a>
            <a href="./ContactForm.html" className="skew">
              <div className="skew-undo">
                <span className="styleLinkText">Contactează-ne</span>
              </div>
            </a>
            <a href="./UsersAccount.html" className="skew">
              <div className="skew-undo">
                <span className="styleLinkText">Contul Tău</span>
              </div>
            </a>
            <a href="./MakeCourse.html" className="skew">
              <div className="skew-undo">
                <span className="styleLinkText">Creează Curs</span>
              </div>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default TopNavBar;