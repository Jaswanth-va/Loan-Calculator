import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";
import Switch from "@mui/material/Switch";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useMyTheme } from "./GobalContext.jsx";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { myTheme, setMyTheme } = useMyTheme();

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  return (
    <>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ display: { md: "none", xs: "flex" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                display: "flex",
                flexGrow: 2,
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              Loan Calculator
            </Typography>
            <Box
              sx={{
                display: { md: "flex", xs: "none" },
                flexGrow: 1,
                gap: "50px",
                alignItems: "center",
              }}
            >
              <NavLink
                to="/"
                style={({ isActive }) => {
                  if (isActive) {
                    return {
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "#1e88e5",
                      borderRadius: "4px",
                    };
                  } else
                    return {
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "inherit",
                    };
                }}
              >
                <Button
                  color="inherit"
                  sx={{
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  Home
                </Button>
              </NavLink>
              <NavLink
                to="/exchange_rates_live"
                style={({ isActive }) => {
                  if (isActive) {
                    return {
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "#1e88e5",
                      borderRadius: "4px",
                    };
                  } else
                    return {
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "inherit",
                    };
                }}
              >
                <Button
                  color="inherit"
                  sx={{
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  Exchange Rates (Live)
                </Button>
              </NavLink>
              <FormControlLabel
                label="Dark Theme"
                control={
                  <Switch
                    checked={myTheme}
                    onChange={(e) => {
                      setMyTheme(e.target.checked);
                    }}
                  />
                }
              />
            </Box>
          </Toolbar>
        </Container>
        <nav>
          <Drawer
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <List>
              <ListItem disablePadding>
                <NavLink
                  to="/"
                  style={({ isActive }) => {
                    if (isActive) {
                      return {
                        textDecoration: "none",
                        width: "100%",
                        color: "white",
                        backgroundColor: "#1e88e5",
                      };
                    } else
                      return {
                        width: "100%",
                        textDecoration: "none",
                        color: "inherit",
                        backgroundColor: "inherit",
                      };
                  }}
                >
                  <ListItemButton onClick={toggleDrawer} sx={{ width: "100%" }}>
                    <ListItemText>Home</ListItemText>
                  </ListItemButton>
                </NavLink>
              </ListItem>
              <ListItem disablePadding>
                <NavLink
                  to="/exchange_rates_live"
                  style={({ isActive }) => {
                    if (isActive) {
                      return {
                        width: "100%",
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "#1e88e5",
                      };
                    } else
                      return {
                        width: "100%",
                        textDecoration: "none",
                        color: "inherit",
                        backgroundColor: "inherit",
                      };
                  }}
                >
                  <ListItemButton onClick={toggleDrawer}>
                    <ListItemText>Exchange Rates (Live)</ListItemText>
                  </ListItemButton>
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={toggleDrawer}>
                  <FormControlLabel
                    label="Dark Theme"
                    control={
                      <Switch
                        checked={myTheme}
                        onChange={(e) => {
                          setMyTheme(e.target.checked);
                        }}
                      />
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </nav>
      </AppBar>
    </>
  );
}
