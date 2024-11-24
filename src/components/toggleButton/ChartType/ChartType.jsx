import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import NetworkCellOutlinedIcon from "@mui/icons-material/NetworkCellOutlined";
import { useTranslation } from "react-i18next";
import { InputLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ChartType = () => {
  const [chartType, setChartType] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handelRedirect = (redir) => {
    navigate(`/dashboard/charts/${redir}`, {
      replace: true,
    });
  };
  const handleChange = (event) => {
    const selectedType = event.target.value;
    setChartType(selectedType);
    switch (selectedType) {
      case t("charType.candle"):
        handelRedirect("c");
        break;
      case t("charType.bar"):
        handelRedirect("b");
        break;
      case t("charType.line"):
        handelRedirect("l");
        break;
      case t("charType.area"):
        handelRedirect("a");
        break;
      default: 
        break;
    }
  };

  return (
    <Box sx={{ minWidth: 60 }}>
      <FormControl
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            outline: "1px ridge #384550", // Elimina el borde azul
            borderColor: "transparent", // Quita el borde en sí
          },
        }}
      >
        <InputLabel
          id="label"
          sx={{
            "&.Mui-focused": {
              color: "gray", // Cambia el color al abrir el menú
            },
          }}
        >
          <CandlestickChartIcon />
        </InputLabel>
        <Select
          labelId="select"
          id="select"
          value={chartType}
          label="chartType"
          onChange={handleChange}
          sx={{
            borderRadius: "1rem",
            height: "3.1rem",
            padding: "0.2rem 0 0 0.4rem",
          }}
          renderValue={(selected) => {
            switch (selected) {
              case t("charType.candle"):
                return <CandlestickChartIcon />;
              case t("charType.bar"):
                return <AlignHorizontalLeftIcon />;
              case t("charType.line"):
                return <TimelineIcon />;
              case t("charType.area"):
                return <NetworkCellOutlinedIcon />;
              default:
                return <CandlestickChartIcon />;
            }
          }}
        >
          <MenuItem value={t("charType.candle")}>
            <Box sx={{ display: "flex", gap: "0.4rem" }}>
              <CandlestickChartIcon />
              <Typography
                sx={{ display: { xs: "none", md: "block", lg: "block" } }}
              >
                {" "}
                {t("charType.candle")}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem value={t("charType.bar")}>
            <Box sx={{ display: "flex", gap: "0.4rem" }}>
              <AlignHorizontalLeftIcon />
              <Typography
                sx={{ display: { xs: "none", md: "block", lg: "block" } }}
              >
                {t("charType.bar")}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem value={t("charType.line")}>
            <Box sx={{ display: "flex", gap: "0.4rem" }}>
              <TimelineIcon />
              <Typography
                sx={{ display: { xs: "none", md: "block", lg: "block" } }}
              >
                {t("charType.line")}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem value={t("charType.area")}>
            <Box sx={{ display: "flex", gap: "0.4rem" }}>
              <NetworkCellOutlinedIcon />
              <Typography
                sx={{ display: { xs: "none", md: "block", lg: "block" } }}
              >
                {t("charType.area")}
              </Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
