import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import AppTheme from "./theme/AppTheme";
import { GoogleIcon } from "./CustomIcons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SocialMedias from "../home/theme/components/SocialMedias";
import { LanguageFlag } from "../components/LanguageFlags";
import { dataLenguage } from "../../db/lenguageDb";
import ColorModeIconDropdown from "../ColorModeIconDropdown";
import { getSignUpSchema } from "../../models/signUp.js";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { usePostUsersMutation } from "../../api/userApi/userApi.js";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export const SignUp = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [schema, setSchema] = useState(getSignUpSchema());
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [postUsers, { data, error, isLoading }] = usePostUsersMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handelRedirect = () => {
    navigate(`/sign_in`, {
      replace: true,
    });
  };

  const onSubmit = async (body) => {
    try {
      await postUsers(body).unwrap();
      enqueueSnackbar(t("alert.cretedUser"), { variant: "success" });
      navigate(`/dashboard/charts/c`, {
        replace: true,
      });
    } catch (err) {
      enqueueSnackbar(t("alert.emailExist"), { variant: "error" });
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setSchema(getSignUpSchema());
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: { xs: 1, lg: 5 },
            gap: 1,
          }}
        >
          <SocialMedias />
          <LanguageFlag data={dataLenguage} />
          <ColorModeIconDropdown />
        </Box>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {t("signUp.signUp")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">{t("signUp.fullName")}</FormLabel>

              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                placeholder="John Wick"
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                {...register("fullname")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">{t("signUp.email")}</FormLabel>
              <TextField
                required
                fullWidth
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                helperText={errors.email?.message}
                error={!!errors.email}
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("signUp.password")}</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                autoComplete="new-password"
                variant="outlined"
                helperText={errors.password?.message}
                error={!!errors.password}
                {...register("password")}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              {t("signUp.signUp")}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => console.log("google!!!")}
              startIcon={<GoogleIcon />}
            >
              {t("signUp.singUpGoogle")}
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              {t("signUp.alreadyHaveAccount")}
              <Link
                variant="body2"
                sx={{ alignSelf: "center" }}
                onClick={handelRedirect}
              >
                {t("signUp.singIn")}
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
};
