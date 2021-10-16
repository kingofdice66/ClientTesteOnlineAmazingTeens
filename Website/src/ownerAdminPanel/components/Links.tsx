import React from "react";
import "./Links.scss";

function Links(): JSX.Element {
  return (
    <div className="ownerAdminPanelLinks">
      <nav className="linksWrapper">
        <div className="links">
          <a href="/" className="skew">
            <div className="skew-undo">
              <span className="styleLinkText">Link_1</span>
            </div>
          </a>
          <a href="/" className="skew">
            <div className="skew-undo">
              <span className="styleLinkText">Link_2</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Links;
