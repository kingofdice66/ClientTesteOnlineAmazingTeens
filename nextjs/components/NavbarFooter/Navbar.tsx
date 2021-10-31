import Link from "../Link/Link";
import style from "./Navbar.module.scss";

function Navbar() {
  return (
    <div className={style.links}>
      <nav>
        <ul>
          {/* prettier-ignore */}
          <li><Link to="##">Link_1</Link></li>
          {/* prettier-ignore */}
          <li><Link to="##">Link_1</Link></li>
          {/* prettier-ignore */}
          <li><Link to="##">Link_1</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
