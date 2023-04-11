import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import apiURL from "../ApiURL/ApiURL";

function RegistrationConfirmation(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { token, email } = router.query;

  useEffect(() => {
    if (router.isReady) {
      console.log("token: ", token);
      console.log("email: ", email);

      axios
        .post(`${apiURL}/verifyEmail`, { token, email })
        .then((res: any) => setMessage(res.data.message))
        .catch((err: any) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (!message) {
    return <div>Loading...</div>;
  }

  switch (message) {
    case "already_verified":
      return <div>Ati fost deja autentificat cu success</div>;
    case "token_expired":
      return <div>Tokenul pentru verificare a expirat</div>;
    case "invalid_email":
      return <div>Adresa de email nu este valida</div>;
    case "invalid_token":
      return <div>Tokenul pentru verificare este invalid</div>;
    case "ok":
      return <div>Ai fost inregistrat cu succes</div>;
    default:
      return <div>Ceva nu a mers bine</div>;
  }
}

export default RegistrationConfirmation;
