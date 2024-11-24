import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "./theme/AppTheme";
import { useTranslation } from "react-i18next";

const Card = styled(MuiCard)(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "4rem 0 auto auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "#567092 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const CalculatorContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export const Calculator = (props) => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    // if (nameError || emailError || passwordError) {
    //   event.preventDefault();
    //   return;
    // }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get("name"),
    //   lastName: data.get("lastName"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <CalculatorContainer direction="column" justifyContent="space-between">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: { xs: 1, lg: 5 },
            gap: 1,
          }}
        ></Box>
        <Card variant="outlined" sx={{ background: "rgba(23, 59, 127, 0.54)" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
              width: "100%",
            }}
          >
            {t("calculator.calculator")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel
                htmlFor="depositCurrency"
                sx={{ color: "#e1621e", fontWeight: "bold" }}
              >
                {t("calculator.depositCurrency")}
              </FormLabel>
              <TextField
                required
                fullWidth
                id="depositCurrency"                
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="currency"
                sx={{ color: "#e1621e", fontWeight: "bold" }}
              >
                {t("calculator.currency")}
              </FormLabel>
              <TextField
                name="currency"
                required
                fullWidth
                id="currency"
                color={"primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="tradeSize"
                sx={{ color: "#e1621e", fontWeight: "bold" }}
              >
                {t("calculator.tradeSize")}
              </FormLabel>
              <TextField
                name="tradeSize"
                required
                fullWidth
                id="tradeSize"
                color={"primary"}
                type="number"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="pipAmount"
                sx={{ color: "#e1621e", fontWeight: "bold" }}
              >
                {t("calculator.pipAmount")}{" "}
              </FormLabel>
              <TextField
                name="pipAmount"
                required
                fullWidth
                id="pipAmount"
                color={"primary"}
                type="number"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ fontWeight: "bold" }}
            >
              {t("calculator.reset")}
            </Button>
          </Box>
        </Card>
      </CalculatorContainer>
    </AppTheme>
  );
};
