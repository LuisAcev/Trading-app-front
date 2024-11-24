import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./theme/components/AppAppBar";
import Display from "./theme/components/Display";
import Features from "./theme/components/Features";
import AppTheme from "./theme/AppTheme";

export const Home = (props) => {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Display />
      <div>
        <Features />
      </div>
    </AppTheme>
  );
};
