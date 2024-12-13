import { Box } from "@mui/material";
import { createChart } from "lightweight-charts";

import { useEffect, useRef } from "react";
import { useGetCandleDataQuery } from "../../api/chartsApi/candleApi";
import { useSelector } from "react-redux";

export const BarCharts = (props) => {
  const {  colors: { backgroundColor = "white" } = {} } = props;
  const instrumentShow = useSelector((item)=>item.instrumentSlice.instrument);
  const { data, error, isLoading } = useGetCandleDataQuery(instrumentShow);
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: "solid", color: "white" },
        textColor: "black",
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 700,
    });

    chart.timeScale().fitContent();
    // chart Type
    const newSeries = chart.addBarSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
    });

    // Get data
    newSeries.setData(data.dataCandle.candelCharts);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor]);

  //TODO quitar error y crear pagina de error
console.log(error);

  return (
    <Box
      ref={chartContainerRef}
      sx={{
        position: "absolute",
        top: "9rem",
        left: { xs: "1rem", md: "17rem", lg: "17rem" },
        right: { xs: "1rem", md: "2rem", lg: "2rem" },
        bottom: 0,
        borderColor: "black",
        borderWidth: "4px",
        borderRadius: "0.5rem",
        borderStyle: "solid",
        zIndex: 1,
      }}
    ></Box>
  );
};
