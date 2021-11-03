import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Navbar.module.scss";

function Navbar() {
  const router = useRouter();
  // ########################################################
  // ######       Highlight appropriate URL navbar     ######
  // ########################################################
  // eslint-disable-next-line camelcase
  const pattern_adminPanel = /\/owner-admin-panel\//;
  // eslint-disable-next-line camelcase
  const pattern_home = /^\/$/;

  // eslint-disable-next-line camelcase
  const highlight_adminPanel = pattern_adminPanel.test(router.pathname);

  // eslint-disable-next-line camelcase
  const highlight_home = pattern_home.test(router.pathname);
  // ########################################################

<<<<<<< HEAD
  console.log("highlight_adminPanel: ", highlight_adminPanel);
  console.log("highlight_home: ", highlight_home);
=======
  // console.log("highlight_adminPanel: ", highlight_adminPanel);
  // console.log("highlight_home: ", highlight_home);
>>>>>>> ported_to_nextjs

  return (
    <div className={style.links}>
      <nav>
        <ul>
          <li>
            <Link href="/" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_home ? style.active : ""}
              >
                Acasă
              </a>
            </Link>
          </li>

          <li>
            <Link href="##" passHref>
              <a href="dummy">Link_1</a>
            </Link>
          </li>

          <li>
<<<<<<< HEAD
            <Link href="/owner-admin-panel/courses" passHref>
=======
            <Link href="/owner-admin-panel/subjects" passHref>
>>>>>>> ported_to_nextjs
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_adminPanel ? style.active : ""}
              >
<<<<<<< HEAD
                Panou Administrare Owner
=======
                Panoul Administrare Owner
>>>>>>> ported_to_nextjs
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
