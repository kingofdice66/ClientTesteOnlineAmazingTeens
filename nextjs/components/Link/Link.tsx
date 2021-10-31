import LINK from "next/link";
import style from "./Link.module.scss";

function Link(props: any) {
  const { to, children } = props;

  return (
    <LINK href={to}>
      <a href={to} className={style.link}>
        {children}
      </a>
    </LINK>
  );
}

export default Link;
