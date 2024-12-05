import { Box } from "@mui/material";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useGetlineDataQuery } from "../../api/chartsApi/lineApi";


export const AreaCharts = (props) => {
  const { colors: { backgroundColor = "white" } = {} } = props;
  const { data, error, isLoading } = useGetlineDataQuery("tsla");

  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;
    
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    console.log(data);
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: "solid", color: "white" },
        textColor: "black",
      },
      width: chartContainerRef.current.clientWidth,
      height: 700,
    });

    chart.timeScale().fitContent();
    // chart Type
    const newSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    // Get data
    newSeries.setData(data.datalinea.lineCharts);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor]);

  return (
    <>
      {isLoading ? (
        <Box> ... Laring chart </Box>
      ) : (
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
      )}
    </>
  );
};
