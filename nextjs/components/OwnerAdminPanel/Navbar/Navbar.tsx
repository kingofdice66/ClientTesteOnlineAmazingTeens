import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Navbar.module.scss";

function Navbar(): JSX.Element {
  const router = useRouter();
  // ########################################################
  // ######       Highlight appropriate URL navbar     ######
  // ########################################################
  // eslint-disable-next-line camelcase
  const pattern_learningMaterial = /\/learning-material/;

  // eslint-disable-next-line camelcase
  const highlight_learningMaterial = pattern_learningMaterial.test(
    router.pathname
  );
  // ########################################################
  return (
    <div className={style.links}>
      <nav>
        <ul>
          <li>
            <Link href="/owner-admin-panel/learning-material/subjects" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_learningMaterial ? style.active : ""}
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
