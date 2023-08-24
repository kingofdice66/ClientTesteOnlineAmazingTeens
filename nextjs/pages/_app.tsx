/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "../styles/normalize.css";
import type { AppProps } from "next/app";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [navBarHeight, setNavBarHeight] = useState(null);
  const [footerHeight, setFooterHeight] = useState(null);
  // eslint-disable-next-line no-underscore-dangle
  const navBarRef = useRef<any>(null);
  // eslint-disable-next-line no-underscore-dangle
  const footerRef = useRef<any>(null);

  useEffect(() => {
    setNavBarHeight(navBarRef.current.clientHeight);
    setFooterHeight(footerRef.current.clientHeight);
  }, []);

  return (
    <>
      <Box ref={navBarRef}>
        <NavBar />
      </Box>
      <Box
        sx={{ height: `calc(100vh - (${navBarHeight}px + ${footerHeight}px))` }}
      >
        <Component {...pageProps} />
      </Box>
      <Box ref={footerRef}>
        <Footer />
      </Box>
    </>
  );
}
