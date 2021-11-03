import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Navbar.module.scss";

function Navbar() {
  const router = useRouter();
  // ########################################################
  // ######       Highlight appropriate URL navbar     ######
  // ########################################################
  // eslint-disable-next-line camelcase
  const pattern_courses = /\/subjects/;

  // eslint-disable-next-line camelcase
  const highlight_courses = pattern_courses.test(router.pathname);
  // ########################################################
  return (
    <div className={style.links}>
      <nav>
        <ul>
          <li>
            <Link href="/owner-admin-panel/subjects" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_courses ? style.active : ""}
              >
                Material Didactic
              </a>
            </Link>
          </li>
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
