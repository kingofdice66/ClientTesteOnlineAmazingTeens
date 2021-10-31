import Link from "next/link";
import style from "./Courses.module.scss";

function Navbar() {
  return (
    <div className={style.links}>
      <nav>
        <ul>
          {/* prettier-ignore */}
          <li><Link href="##" passHref><a href="dummy">Cursuri</a></Link></li>
          {/* prettier-ignore */}
          <li><Link href="##" passHref><a href="dummy">Administratorii Forumului</a></Link></li>
          {/* prettier-ignore */}
          <li><Link href="##" passHref><a href="dummy">Utilizatori</a></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
