import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";

const pages = ["About Us", "Contact"];

export const Header = () => {
  const username = useSelector((state) => state.login.username);
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundImage: `url("head4.png")`,
        color: "#000",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "120px" }}>
          <AdbIcon
            style={{ fontSize: "50px", color: "white" }}
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: 1,
            }}
          />
          <Typography
            variant="h6"
            // align="center"
            noWrap
            component="a"
            href="#"
            // marginLeft={"2px"}
            sx={{
              marginLeft: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              fontSize: "50px",
            }}
          >
            Consci AI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="beige"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            <Typography color={"white"} marginLeft={"50px"}>
              Embracing Responsible AI Practices
            </Typography>
          </Box>

          <Box>
            <IconButton sx={{ p: 0 }}>
              <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Typography
              variant="body"
              sx={{ fontWeight: 800, marginLeft: "1rem", color: "beige" }}
            >
              {username}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
