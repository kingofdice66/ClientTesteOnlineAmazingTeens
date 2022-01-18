import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Navbar.module.scss";

function Navbar(): JSX.Element {
  const router = useRouter();
  // ####################################################################
  // ##########       Highlight appropriate URL navbar         ##########
  // ####################################################################

  // ###################################################
  // ######                Patterns               ######
  // ###################################################
  // eslint-disable-next-line camelcase
  const pattern_adminPanel = /\/owner-admin-panel\//;
  // eslint-disable-next-line camelcase
  const pattern_home = /^\/$/;
  // eslint-disable-next-line camelcase
  const pattern_forum = /\/forum/;
  // eslint-disable-next-line camelcase
  const pattern_login = /\/login/;
  // eslint-disable-next-line camelcase
  const pattern_registration = /\/registration/;
  // eslint-disable-next-line camelcase
  const pattern_chat = /\/chat/;
  // eslint-disable-next-line camelcase
  const pattern_notifications = /\/notifications/;
  // eslint-disable-next-line camelcase
  const pattern_account = /\/account/;

  // ###################################################
  // ######                  Tests                ######
  // ###################################################
  // eslint-disable-next-line camelcase
  const highlight_adminPanel = pattern_adminPanel.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_home = pattern_home.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_forum = pattern_forum.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_login = pattern_login.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_registration = pattern_registration.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_chat = pattern_chat.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_notifications = pattern_notifications.test(router.pathname);
  // eslint-disable-next-line camelcase
  const highlight_account = pattern_account.test(router.pathname);
  // ####################################################################

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
            <Link href="/forum/topics" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_forum ? style.active : ""}
              >
                Forum
              </a>
            </Link>
          </li>

          <li>
            <Link href="/owner-admin-panel/learning-material/subjects" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_adminPanel ? style.active : ""}
              >
                Panoul Administrare Owner
              </a>
            </Link>
          </li>

          <li>
            <Link href="/login" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_login ? style.active : ""}
              >
                Logare
              </a>
            </Link>
          </li>

          <li>
            <Link href="/registration" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_registration ? style.active : ""}
              >
                Înregistrare
              </a>
            </Link>
          </li>

          <li>
            <Link href="/chat" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_chat ? style.active : ""}
              >
                Chat
              </a>
            </Link>
          </li>

          <li>
            <Link href="/notifications" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_notifications ? style.active : ""}
              >
                Notificări
              </a>
            </Link>
          </li>

          <li>
            <Link href="/account" passHref>
              <a
                href="dummy"
                // eslint-disable-next-line camelcase
                className={highlight_account ? style.active : ""}
              >
                Contul tău
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
