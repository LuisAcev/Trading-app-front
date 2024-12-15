import { Box } from "@mui/material";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useGetlineDataQuery } from "../../api/chartsApi/lineApi";
import { useSelector } from "react-redux";
import { Loading } from "../loading/Loading";
import { ErrorPage } from "../error/ErrorPage";

export const AreaCharts = (props) => {
  const { colors: { backgroundColor = "white" } = {} } = props;
  const { instrument, time } = useSelector((item) => item.instrumentSlice);
  const { data, error, isLoading } = useGetlineDataQuery({
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
        background: { type: "solid", color: "white" },
        textColor: "black",
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 700,
    });

    // chart Type
    const newSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
      lineWidth: 2,
    });

    // Tooltips (marcador de posicion y precio) //

    const container = chartContainerRef.current;

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement("div");
    toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 0.5px; box-sizing: border-box; font-size: 13px; text-align: center; z-index: 1000; top: 10px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 18px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = "white";
    toolTip.style.color = "black";
    toolTip.style.borderColor = "rgba(41, 98, 255)";
    container.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time;
        toolTip.style.display = "block";
        const dataArea = param.seriesData.get(newSeries);
        const price =
          dataArea.value !== undefined ? dataArea.value : dataArea.close;
        toolTip.innerHTML = `<div style="color: ${"rgba( 38, 166, 154, 1)"}; font-weight: bolder; margin-top:2px; ">${instrument}</div><div style="font-size: 24px; margin: 1px 0px; color: ${"black"}">
          $${Math.round(100 * price) / 100}
          </div><div style="color: ${"black"}; font-weight: bolder;">
          ${dateStr}
          </div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + "px";
        toolTip.style.top = top + "px";
      }
    });

    chart.timeScale().fitContent();

    // Get data
    newSeries.setData(data.datalinea.lineCharts);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor]);

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
