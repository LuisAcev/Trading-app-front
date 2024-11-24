import { useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { TimeFrames } from "./timeFrames/TimeFrames";
import { FiguresToogle } from "./figures/FiguresToogle";
import { Box } from "@mui/material";
import { InstrumentName } from "../instrumentName/InstrumentName";
import { ChartType } from "./ChartType/ChartType";

export const ToggleButtonFigures = ({
  handleFinishArrow,
  handleFinishCircle,
  handleFinishRect,
  handleFinishLine,
  handleFinishText,
  handleDelete,
  handleUploadColor,
  handleChangeText,
  changeText,
  color,
  setColor,
  textValue,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [alignment, setAlignment] = useState("left");
  const [formats] = useState(() => ["italic"]);

  const handleAlignment = (newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: "flex",
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
        })}
      >
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <InstrumentName />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <TimeFrames value={alignment} onChange={handleAlignment} />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ChartType />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <FiguresToogle
          handleFinishArrow={handleFinishArrow}
          handleFinishCircle={handleFinishCircle}
          handleFinishRect={handleFinishRect}
          handleFinishLine={handleFinishLine}
          handleFinishText={handleFinishText}
          handleDelete={handleDelete}
          handleUploadColor={handleUploadColor}
          handleChangeText={handleChangeText}
          handleAlignment={handleAlignment}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
          changeText={changeText}
          color={color}
          formats={formats}
          open={open}
          setColor={setColor}
          textValue={textValue}
        />
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            mx: 0.5,
            my: 1,
            display: { xs: "none", md: "block", lg: "block" },
          }}
        />
      </Paper>
    </Box>
  );
};