import { useEffect, useState } from "react";
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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useSnackbar } from "notistack";
import { ForgotPassword } from "./ForgotPassword";
import { GoogleIcon } from "./CustomIcons";
import AppTheme from "./theme/AppTheme";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SocialMedias from "../home/theme/components/SocialMedias";
import { LanguageFlag } from "../components/LanguageFlags";
import { dataLenguage } from "../../db/lenguageDb";
import ColorModeIconDropdown from "../ColorModeIconDropdown";
import { getSignInSchema } from "../../models/signIn.js";
import {
  useGetUsersQuery,
  usePutUsersMutation,
} from "../../api/userApi/userApi.js";
import { useDispatch, useSelector } from "react-redux";
import { usersAdded, usersUpdate } from "../../store/slices/usersSlice.js";
import { InputAdornment } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export const SignIn = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id } = useSelector((ietm) => ietm.userSlice);
  const [putUsers] = usePutUsersMutation();
  const [schema] = useState(getSignInSchema(t));
  const [queryArgs, setQueryArgs] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorHandel, setErrorHandel] = useState(false); // Cambiado a false por defecto
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data, error, isLoading } = useGetUsersQuery(queryArgs, {
    skip: !queryArgs,
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const handelRedirectDashBoard = async (data) => {
    await putUsers({ id: data._id, body: { isLoading: true } });
    enqueueSnackbar(t("alert.useraccess"), {
      variant: "success",
      autoHideDuration: 1000,
    });
    navigate(`/dashboard/charts/c`, {
      replace: true,
    });
  };

  const onSubmit = (info) => {
    setIsSubmitting(true); // Marcar como en proceso de envío
    setQueryArgs({ email: info.email, password: info.password });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelRedirectSingUp = () => {
    navigate(`/sign_up`, {
      replace: true,
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      if (error) {
        enqueueSnackbar(t("alert.useraccessdenied"), {
          variant: "error",
          autoHideDuration: 1000,
        });
        setErrorHandel(true);
        setIsSubmitting(false);
      } else if (data) {
        handelRedirectDashBoard(data);
        dispatch(usersAdded(data));
        dispatch(usersUpdate({ isLoading: true }));
      }
    }
  }, [error, data, isSubmitting, enqueueSnackbar]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
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
            {t("signIn.signIn")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">{t("signIn.email")}</FormLabel>
              <TextField
                autoFocus
                autoComplete="email"
                error={!!errors.email}
                fullWidth
                helperText={errors.email?.message}
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                variant="outlined"
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("signIn.password")}</FormLabel>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                placeholder="•••••••••"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register("password")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => setShowPassword((show) => !show)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "transparent", // Evita el cambio de fondo
                              boxShadow: "none", // Elimina sombras o resaltados adicionales
                            },
                          }}
                        >
                          {showPassword ? (
                            <RemoveRedEyeOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </Button>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              {t("signIn.signIn")}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              {t("signIn.forgotPass")}
            </Link>
          </Box>
          <Divider> {t("signIn.or")}</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              {t("signIn.singInGoogle")}
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              {t("signIn.haveAccount")}
              <Link
                variant="body2"
                sx={{ alignSelf: "center" }}
                onClick={handelRedirectSingUp}
              >
                {t("signIn.singUp")}
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};
