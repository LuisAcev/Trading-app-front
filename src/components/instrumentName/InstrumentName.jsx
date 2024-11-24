import { Box, Typography } from "@mui/material";

export const InstrumentName = () => {
  return (
    <Box sx={{width:{xs:"11rem", md:"12rem",lg:"12rem"}}}>
      <Typography
        sx={{
          alignItems: "center",
          marginTop: "0.7rem",
          marginLeft: "0.4rem",
          marginRight: "0.4rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          color: "#949494",
          fontSize:{xs:"1.2rem", md:"1.2rem",lg:"1.4rem"},
          padding:"0"
          }}
      >
        Apple 1D Stock
      </Typography>
    </Box>
  );
};
