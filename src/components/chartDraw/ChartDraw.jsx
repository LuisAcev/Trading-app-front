import React from "react";
import { Box } from "@mui/material";
import { SelectFigure } from "../drawTools/SelectFigure.jsx";
import { Outlet } from "react-router-dom";

export const ChartDraw = () => {
  return (
    <Box>
      <SelectFigure />
      <Outlet />
    </Box>
  );
};
