import { Box } from "@mui/material";
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useGetCandleDataQuery } from "../../api/chartsApi/candleApi";
import { useSelector } from "react-redux";
import { Loading } from "../loading/Loading";
import { ErrorPage } from "../error/ErrorPage";

export const CandleCharts = (props) => {
  const { colors: { backgroundColor = "white" } = {} } = props;
  const { instrument, time } = useSelector((item) => item.instrumentSlice);
  const { data, error, isLoading } = useGetCandleDataQuery({
    asset: instrument ? instrument : "AAPL",
    time: time,
  });
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: "black",
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 700,
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

  // Errores

  const errorStatus =
    error?.data?.status || error?.status || ` Status: Error 404 `;
  const errorMessage =
    error?.data?.error || error?.error || "OOPS !!! This page has crashed. ";

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorPage status={errorStatus} err={errorMessage} />
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
