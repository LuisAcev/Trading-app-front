import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import AppTheme from "./AppTheme";
import AppNavbarMobil from "./components/AppNavbarMobil";
import {} from "@mui/icons-material";
import { Outlet } from "react-router-dom";

export default function Dashboard(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbarMobil />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            // sattings bar instrument chart
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              margin: { xs: "4rem 0 0 0", md: "1rem 0 0 0" },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
