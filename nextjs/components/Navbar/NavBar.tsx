import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

function NavBar(): JSX.Element {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h6">AmazingTeens</Typography>

        <Link href="#test" style={{ textDecoration: "none" }}>
          <Button sx={{ color: "white" }}>Cursuri</Button>
        </Link>

        <Box sx={{ ml: "auto" }}>
          <Link href="/registration" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Înregistrează-te</Button>
          </Link>

          <Link href="#test" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Conectare</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
