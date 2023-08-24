import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
          <Paper elevation={7} sx={{ display: "inline", p: "8px 10px" }}>
            <InputBase placeholder="programare, limbi, marketing..." />
            <IconButton type="button" sx={{ p: "10px" }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Link href="#test" style={{ textDecoration: "none" }}>
            <IconButton type="button" sx={{ p: "10px" }}>
              <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Link>

          <Link href="#test" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Conectare</Button>
          </Link>

          <Link href="/registration" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Înregistrează-te</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
