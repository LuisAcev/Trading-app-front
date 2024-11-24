import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { inputsCustomizations } from "./customizations/inputs.js";
import { dataDisplayCustomizations } from "./customizations/dataDisplay.js";
import { surfacesCustomizations } from "./customizations/surfaces.js";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives.js";

export default function AppTheme({
  children,
  disableCustomTheme,
}) {
  const theme = useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...surfacesCustomizations,
          },
        });
  }, [disableCustomTheme]);
  if (disableCustomTheme) {
    return <>{children}</>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
