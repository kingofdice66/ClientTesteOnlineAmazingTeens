import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Navbar.module.scss";

function Navbar() {
  const router = useRouter();
  // ########################################################
  // ######       Highlight appropriate URL navbar     ######
  // ########################################################
  // eslint-disable-next-line camelcase
<<<<<<< HEAD
  const pattern_courses = /\/courses/;
=======
  const pattern_courses = /\/subjects/;
>>>>>>> ported_to_nextjs

  // eslint-disable-next-line camelcase
  const highlight_courses = pattern_courses.test(router.pathname);
  // ########################################################
  return (
    <div className={style.links}>
      <nav>
        <ul>
          <li>
<<<<<<< HEAD
            <Link href="/owner-admin-panel/courses" passHref>
=======
            <Link href="/owner-admin-panel/subjects" passHref>
>>>>>>> ported_to_nextjs
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_courses ? style.active : ""}
              >
<<<<<<< HEAD
                Cursuri
=======
                Material Didactic
>>>>>>> ported_to_nextjs
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
