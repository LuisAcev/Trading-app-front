import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export const TimeFrames = ({ props}) => {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState(null);

  const handleSelection = (event, newValue) => {
    // newValue será el valor del ToggleButton seleccionado
    setSelectedValue(newValue);}
  return (
    <Box>
      <ToggleButtonGroup
        value={selectedValue}
        exclusive
        onChange={handleSelection}
        aria-label="text alignment"
      >
        <ToggleButton value="1M" aria-label="left aligned" title={t("timeFrames.1m")}  sx={{ borderRadius:"1rem",'&.Mui-selected': { color: 'white'}, width:{xs:"2rem", md:"3rem",lg:"3rem"}}}>
          1M
        </ToggleButton>
        <ToggleButton value="1D" aria-label="centered" title={t("timeFrames.1d")} sx={{'&.Mui-selected': { color: 'white'},width:{xs:"2rem", md:"3rem",lg:"3rem"}}}>
          1D
        </ToggleButton>
        <ToggleButton value="1H" aria-label="right aligned" title={t("timeFrames.1h")}  sx={{borderRadius:"1rem",'&.Mui-selected': { color: 'white'},width:{xs:"2rem", md:"3rem",lg:"3rem"}}}>
          1H
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
