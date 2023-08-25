import { Box } from "@mui/material";

function Footer(props: any): JSX.Element {
  const { footerRef } = props;

  return (
    <Box sx={{ backgroundColor: "red" }} ref={footerRef}>
      Footer
    </Box>
  );
}

export default Footer;
