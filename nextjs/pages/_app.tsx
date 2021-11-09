// import "../styles/globals.css"; <-- substituted with 'normalize.css'
import type { AppProps } from "next/app";
import Navbar from "../components/NavbarFooter/Navbar";
import Footer from "../components/NavbarFooter/Footer";
import style from "../styles/Content.module.scss";
import "normalize.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Navbar />
      <div className={style.content}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
