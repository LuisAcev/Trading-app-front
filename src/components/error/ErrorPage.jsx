import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const ErrorPage = ({ status, err }) => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        minHeight: "100%",
        justifyContent: "center",
        left: { xs: "2rem", md: "17rem", lg: "40rem" },
        top: { xs: "12rem", md: "15rem", lg: "15rem" },
        position: "absolute",
        right: { xs: "1rem", md: "2rem", lg: "2rem" },
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src="/helpers/error-404.png"
            sx={{
              display: "inline-block",
              height: "auto",
              maxWidth: "100%",
              width: "400px",
            }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {status ? ` Status: ${status} ` : ` Status: Error 404 `}
        </Typography>
        <Typography
          color="text.secondary" 
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {err ? `${err}` : "OOPS !!! This page has crashed "}
        </Typography>
      </Stack>
    </Box>
  );
};
