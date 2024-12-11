import { useRef, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { DeleteButton } from "./accountButton/DeleteButton";
import { UpdateButon } from "./accountButton/UpdateButton";
import { accountShema } from "../../../models/account.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { AvatarLog } from "./avatar/AvatarLog.jsx";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const Account = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [body, setBody] = useState({});
  const [editText, setEditText] = useState(true);
  const [schema] = useState(accountShema(t));
  const [showPassword, setShowPassword] = useState(false);
  const payload = useSelector((ietm) => ietm.userSlice);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      _id: payload._id,
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password,
      cellPhone: payload.cellPhone || 0,
      country: payload.country,
      img: payload.img,
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (item) => {
    setEditText(true);
    setBody(item);
  };
  return (
    <Box sx={{ width: "90%", padding: {xs:"0.5rem 0 0 0", lg:"4rem 0 0 0"} }}>
      <AvatarLog />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel
              htmlFor="country"
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              ID
            </FormLabel>
            <Controller
              name="_id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  value={payload._id}
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
                  disabled={editText}
                  error={!!errors._id}
                  helperText={errors._id?.message}
                />
              )}
            />
          </FormGrid>
          {/* Campo: Nombre Completo */}
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel
              htmlFor="first-name"
              required
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              {t("account.fullName")}
            </FormLabel>
            <Controller
              name="fullname"
              control={control}
              required
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="John Wick"
                  size="small"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
                  disabled={editText}
                  error={!!errors.fullname}
                  helperText={errors.fullname?.message}
                />
              )}
            />
          </FormGrid>
          {/* Campo: Email */}
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel
              htmlFor="email"
              required
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              {t("account.email")}
            </FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="test@gmail.com"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
                  disabled
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </FormGrid>

          {/* Campo: Contraseña */}
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel
              htmlFor="last-name"
              required
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              {t("account.password")}
            </FormLabel>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  size="small"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
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
                  disabled={editText}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </FormGrid>
          {/* Campo: Número de Teléfono */}
          <FormGrid size={{ xs: 6 }}>
            <FormLabel
              htmlFor="cellPhone"
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              {t("account.phoneNumber")}
            </FormLabel>
            <Controller
              name="cellPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  placeholder="(111) 111-1111"
                  size="small"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
                  disabled={editText}
                  error={!!errors.cellPhone}
                  helperText={errors.cellPhone?.message}
                />
              )}
            />
          </FormGrid>
          {/* Campo: País */}
          <FormGrid size={{ xs: 6 }}>
            <FormLabel
              htmlFor="country"
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              {t("account.country")}
            </FormLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="United States"
                  size="small"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
                  disabled={editText}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />
          </FormGrid>

          {/* Campo: Imagen */}

          <FormGrid size={{ xs: 6 }}>
            <FormLabel
              htmlFor="img"
              sx={{ fontSize: 17, fontWeight: "bold" }}
            >
              {t("account.avatar")}
            </FormLabel>
            <Controller
              name="img"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "rgba(142, 150, 171, 0.25)",
                      fontSize: 17,
                    },
                  }}
                  disabled={editText}
                  error={!!errors.img}
                  helperText={errors.img?.message}
                />
              )}
            />
          </FormGrid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            margin: "4rem auto auto auto",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* Edit button */}
          <Button
            variant="contained"
            onClick={() => setEditText(false)}
            color=""
            sx={{
              backgroundColor: "rgba(9, 86, 239, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(9, 86, 239, 0.9)", // Color al hacer hover
              },
              fontSize: 19,
              fontWeight: "bold",
              width: { xs: "100%", sm: "fit-content", lg: "15%" },
            }}
          >
            {t("account.edit")}
          </Button>

          {/* Update button */}
          <UpdateButon setEditText={setEditText} body={body} error={errors} />

          {/* Delete button */}
          <DeleteButton setEditText={setEditText} />
        </Box>
      </form>
    </Box>
  );
};
