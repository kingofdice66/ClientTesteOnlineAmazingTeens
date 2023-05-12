import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EmailConfirmation = (): JSX.Element => {
  const { token } = useRouter().query;

  const success = (): JSX.Element => <div>SUCCESS</div>;

  const failed = (): JSX.Element => <div>FAILED</div>;

  useEffect((): void => {
    if (token) {
      axios
        .post("http://localhost:5177/emailvalidation/validateemail", {
          token: token.toString().trim(),
        })
        .then((resp) => console.log(resp.data))
        .catch((error) => error);
    }
  }, [token]);

  return <div>{typeof token}</div>;
};

export default EmailConfirmation;
