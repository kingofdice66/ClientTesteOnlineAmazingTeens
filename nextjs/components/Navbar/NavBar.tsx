import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

function NavBar(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My App Title</Typography>
        <Box sx={{ ml: "auto" }}>
          <Link href="/registration">
            <Button component="a" variant="contained">
              Înregistrează-te
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
