import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { createTheme, ThemeProvider, CssBaseline, Button } from "@mui/material";
import { useMyTheme } from "./GobalContext.jsx";

export default function Layout() {
  const { myTheme } = useMyTheme();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const globalTheme = myTheme ? darkTheme : lightTheme;
  return (
    <main>
      <ThemeProvider theme={globalTheme}>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </main>
  );
}
