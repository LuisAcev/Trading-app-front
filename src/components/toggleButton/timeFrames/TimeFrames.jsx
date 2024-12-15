import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { instrumentChart } from "../../../store/slices/chartInstrument";

export const TimeFrames = ({ props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const handleSelection = (event) => {
    dispatch(instrumentChart({ time: event.target.value }));
  };
  return (
    <Box>
      <ToggleButtonGroup
        exclusive
        onChange={handleSelection}
        aria-label="text alignment"
      >
        <ToggleButton
          value="1m"
          aria-label="left aligned"
          title={t("timeFrames.1month")}
          sx={{
            borderRadius: "1rem",
            "&.Mui-selected": { color: "white" },
            width: { xs: "2rem", md: "3rem", lg: "3.5rem" },
          }}
        >
          {t("timeFrames.1m")}
        </ToggleButton>
        <ToggleButton
          value="1w"
          aria-label="centered"
          title={t("timeFrames.1week")}
          sx={{
            "&.Mui-selected": { color: "white" },
            width: { xs: "2rem", md: "3rem", lg: "3.5rem" },
          }}
        >
          {t("timeFrames.1w")}
        </ToggleButton>
        <ToggleButton
          value="1d"
          aria-label="right aligned"
          title={t("timeFrames.1day")}
          sx={{
            borderRadius: "1rem",
            "&.Mui-selected": { color: "white" },
            width: { xs: "2rem", md: "3rem", lg: "3.5rem" },
          }}
        >
          {t("timeFrames.1d")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
