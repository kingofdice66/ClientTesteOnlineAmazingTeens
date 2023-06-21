/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "../styles/normalize.css";
import type { AppProps } from "next/app";
import NavBar from "../components/Navbar/NavBar";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
