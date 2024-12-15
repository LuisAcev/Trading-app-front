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
import { depositCurrency, instrument } from "../../../db/assets";
import { DepositInstrumentBar } from "./secction/DepositInstrumentBar";
import { DepositCoinBar } from "./secction/DepositCoinBar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ErrorPage } from "../../../components/error/ErrorPage";

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
    width: "100%",
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
  const calcaInfo = useSelector((item) => item.calcSlice);
  const [calcValues, setcalcValues] = useState(0);

  // useForm //
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deposit: calcaInfo.deposit || "",
      instrument: calcaInfo.instrument || "",
      price: calcaInfo.price || "",
      lotes: calcaInfo.lotes || 1,
      pipSize: calcaInfo.pipSize || "",
      pip: calcaInfo.pip || 1,
    },
    mode: "onChange",
  });
  const onSubmit = (item) => {
    try {
      let pipSizePip = calcaInfo.fx ? item.pipSize * item.pip : 0;
      let priceLotes = item.price * item.lotes;
      setcalcValues(priceLotes + pipSizePip);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    setValue("price", calcaInfo.price);
    setValue("pipSize", calcaInfo.pipSize);
  }, [calcaInfo, setValue]);

  return (
    <>
      {Object.keys(errors).length === 0 ? (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <CalculatorContainer
            direction="column"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: { xs: 1, lg: 5 },
                gap: 1,
              }}
            ></Box>
            <Card
              variant="outlined"
              sx={{ background: "rgba(23, 59, 127, 0.54)" }}
            >
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
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                  {/* DEPOSIT CURRENCY */}

                  <FormControl>
                    <FormLabel
                      htmlFor="depositCurrency"
                      sx={{ color: "#e1621e", fontWeight: "bold" }}
                    >
                      {t("calculator.depositCurrency")}
                    </FormLabel>
                    <DepositCoinBar
                      setValue={setValue}
                      options={depositCurrency}
                    />
                  </FormControl>

                  {/* INSTRUMENT */}
                  <FormControl>
                    <FormLabel
                      htmlFor="currency"
                      sx={{ color: "#e1621e", fontWeight: "bold" }}
                    >
                      {t("calculator.currency")}
                    </FormLabel>
                    <DepositInstrumentBar
                      setValue={setValue}
                      setcalcValues={setcalcValues}
                      options={instrument}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  {/* PRECIO DEL INSTRUMENTO */}

                  <FormControl>
                    <FormLabel
                      htmlFor="price"
                      sx={{ color: "#e1621e", fontWeight: "bold" }}
                    >
                      {`${t("calculator.price")} ${calcaInfo.instrument}`}
                    </FormLabel>
                    <TextField
                      disabled
                      name="price"
                      required
                      fullWidth
                      id="price"
                      color={"primary"}
                      type="number"
                      sx={{
                        ".MuiOutlinedInput-root": {
                          backgroundColor: "rgba(67, 70, 75, 0.5)",
                          fontSize: 17,
                          width: "200px",
                        },
                      }}
                      {...register("price")}
                    />
                  </FormControl>

                  {/* LOTES */}

                  <FormControl>
                    <FormLabel
                      htmlFor="lotes"
                      sx={{ color: "#e1621e", fontWeight: "bold" }}
                    >
                      {t("calculator.lotes")}{" "}
                    </FormLabel>
                    <TextField
                      name="lotes"
                      required
                      fullWidth
                      id="lotes"
                      color={"primary"}
                      type="number"
                      inputProps={{
                        step: "any",
                      }}
                      sx={{
                        ".MuiOutlinedInput-root": {
                          backgroundColor: "rgba(67, 70, 75, 0.5)",
                        },
                      }}
                      {...register("lotes")}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  {/* VALOR DE UN 1 PIP */}

                  <FormControl>
                    <FormLabel
                      htmlFor="pipSize"
                      sx={{ color: "#e1621e", fontWeight: "bold" }}
                    >
                      {t("calculator.pipSize")}
                    </FormLabel>
                    <TextField
                      name="pipSize"
                      disabled={!calcaInfo.fx}
                      required
                      fullWidth
                      id="pipSize"
                      color={"primary"}
                      type="number"
                      inputProps={{
                        step: "any",
                      }}
                      sx={{
                        ".MuiOutlinedInput-root": {
                          backgroundColor: "rgba(67, 70, 75, 0.5)",
                        },
                      }}
                      {...register("pipSize")}
                    />
                  </FormControl>

                  {/* PIPS */}

                  <FormControl>
                    <FormLabel
                      htmlFor="pip"
                      sx={{ color: "#e1621e", fontWeight: "bold" }}
                    >
                      {t("calculator.pip")}{" "}
                    </FormLabel>
                    <TextField
                      name="pip"
                      disabled={!calcaInfo.fx}
                      required
                      fullWidth
                      id="pip"
                      color={"primary"}
                      type="number"
                      sx={{
                        ".MuiOutlinedInput-root": {
                          backgroundColor: "rgba(67, 70, 75, 0.5)",
                        },
                      }}
                      {...register("pip")}
                    />
                  </FormControl>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ fontWeight: "bold" }}
                >
                  {t("calculator.calculate")}
                </Button>
                <Box sx={{ textAlign: "center" }}>
                  <TextField
                    disabled
                    color={"primary"}
                    name="total"
                    value={`   $ ${calcValues}`}
                    variant="outlined"
                    sx={{
                      ".MuiOutlinedInput-root": {
                        backgroundColor: "transparent",
                        fontWeight: 50,
                        fontSize: 40,
                        textAlign: "center",
                        width: "18rem",
                        border: "none",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </CalculatorContainer>
        </AppTheme>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
