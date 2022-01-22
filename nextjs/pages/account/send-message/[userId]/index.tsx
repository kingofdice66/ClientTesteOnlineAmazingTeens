import SendMessage from "../../../../components/Account/SendMessage/SendMessage";
import LeftNavbar from "../../../../components/Account/LeftNavbar/LeftNavbar";
import style from "./index.module.scss";

function sendMessage(): JSX.Element {
  return (
    <div className={style.flex}>
      <div>
        <LeftNavbar />
      </div>
      <div>
        <SendMessage />
      </div>
    </div>
  );
}

export default sendMessage;
