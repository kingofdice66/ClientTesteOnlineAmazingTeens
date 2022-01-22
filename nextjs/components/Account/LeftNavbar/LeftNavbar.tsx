import Link from "next/link";
import style from "./LeftNavbar.module.scss";

function Links(): JSX.Element {
  return (
    <div className={style.links}>
      <nav>
        <ul>
          <li>
            <Link href="/account/messages" passHref>
              <a href="dummy">Mesaje</a>
            </Link>
          </li>

          <li>
            <Link href="/account/chat-requests" passHref>
              <a href="dummy">Cereri Chat</a>
            </Link>
          </li>

          <li>
            <Link href="/account/send-message" passHref>
              <a href="dummy">Trimite Mesaj</a>
            </Link>
          </li>

          <li>
            <Link href="/account/send-chat-request" passHref>
              <a href="dummy">Trimite Cerere Chat</a>
            </Link>
          </li>

          <li>
            <Link href="/account/settings" passHref>
              <a href="dummy">Setări Cont</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Links;
