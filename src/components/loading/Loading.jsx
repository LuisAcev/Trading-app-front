import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function GradientCircularProgress() {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={140}
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </>
  );
}
export const Loading = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "15rem",
        left: { xs: "9rem", md: "50rem", lg: "60rem" },
        bottom: 0,

        zIndex: 1,
      }}
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <GradientCircularProgress />
        <Typography
          sx={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {t("alert.loading")}
        </Typography>
      </Stack>
    </Box>
  );
};
