import { useState } from "react";
import TinyMCE from "../../CustomComponents/TinyMCE/TinyMCE";
import style from "./SendMessage.module.scss";

function SendMessages(): JSX.Element {
  const [username, setUsername] = useState<string>("");

  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <label htmlFor="username">
          Numele utilizatorului:
          <br />
          <input
            id="username"
            value={username}
            onChange={(e): void => setUsername(e.target.value)}
            placeholder="nume utilizator..."
          />
        </label>
        <br />

        <TinyMCE
          height={500}
          onEditorChange={(evt: any, editor: any): void => {
            //
          }}
          initialValue="<h1>Scrie mesaj...</h1>"
        />
      </div>
    </div>
  );
}

export default SendMessages;
