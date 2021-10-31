import Link from "next/link";
import style from "./Navbar.module.scss";

function Navbar() {
  return (
    <div className={style.links}>
      <nav>
        <ul>
          {/* prettier-ignore */}
          <li><Link href="/" passHref><a href="dummy">Acasă</a></Link></li>
          {/* prettier-ignore */}
          <li><Link href="##" passHref><a href="dummy">Link_1</a></Link></li>
          {/* prettier-ignore */}
          <li><Link href="/owner-admin-panel/courses" passHref><a href="dummy">Panoul Administrare Owner</a></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
