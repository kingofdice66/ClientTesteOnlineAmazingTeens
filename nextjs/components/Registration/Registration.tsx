import axios from "axios";

function Registration(): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("form submitted");
  };

  return (
    <form onSubmit={(e): void => handleSubmit(e)}>
      <label htmlFor="username">
        <input id="username" placeholder="username..." />
      </label>
      <br />
      <label htmlFor="password">
        <input id="password" placeholder="introdu parola..." />
      </label>
      <br />
      <label htmlFor="retypePassword">
        <input id="retypePassword" placeholder="reintrodu payola..." />
      </label>
      <br />
      <button type="submit">Înregistreaza-mă</button>
    </form>
  );
}

export default Registration;
