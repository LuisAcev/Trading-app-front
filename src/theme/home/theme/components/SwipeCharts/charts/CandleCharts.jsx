import { Box } from "@mui/material";
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useGetCandleDataQuery } from "../../../../../../api/chartsApi/candleApi";

export const CandleCharts = (props) => {
  const { colors: { backgroundColor = "white" } = {}, instrument } = props;
  const { data, error, isLoading } = useGetCandleDataQuery(
    instrument.split("|")[0]
  );
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'rgba(7, 46, 61, 0.4)' },
        textColor: "white",
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 550,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      watermark: {
        visible: true,
        fontSize: 32,
        horzAlign: "center",
        vertAlign: "center",
        color: "rgba(233, 128, 8)",
        text: instrument,
      },
    });
    chart.timeScale().fitContent();
    // chart Type
    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Get data
    newSeries.setData(data.dataCandle.candelCharts);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor]);
  //TODO

  //  console.log(error)
  return (
    <>
      {isLoading ? (
        <Box> ... Laring chart </Box>
      ) : (
        <Box
          ref={chartContainerRef}
          sx={{
            borderColor: "black",
            borderWidth: "4px",
            borderStyle: "solid",
            width: { xs: "100%", md: "90%", lg: "90%" },
            marginTop: "1rem",
          }}
        ></Box>
      )}
    </>
  );
};
