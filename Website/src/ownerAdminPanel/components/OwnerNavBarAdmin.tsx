// Top nav bar for administration for the site owner.

import React from "react";
import "./OwnerNavBarAdmin.scss";

function OwnerNavBarAdmin(): JSX.Element {
  return (
    <div className="ownerAdminPanelLinks">
      <nav className="linksWrapper">
        <div className="links">
          <a href="?highlight=cursuri&show=subjects" className="skew">
            <div className="skew-undo">
              <span className="styleLinkText">cursuri</span>
            </div>
          </a>
          <a href="/" className="skew">
            <div className="skew-undo">
              <span className="styleLinkText">administratorii forumului</span>
            </div>
          </a>
          <a href="/" className="skew">
            <div className="skew-undo">
              <span className="styleLinkText">utilizatori</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default OwnerNavBarAdmin;
