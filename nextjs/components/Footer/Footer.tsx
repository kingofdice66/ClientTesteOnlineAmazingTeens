import { Box } from "@mui/material";

function Footer(props: any): JSX.Element {
  const { footerRef } = props;

  return <Box ref={footerRef}>Footer</Box>;
}

export default Footer;
