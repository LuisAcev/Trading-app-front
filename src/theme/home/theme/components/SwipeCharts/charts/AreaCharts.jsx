import { Box } from "@mui/material";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useGetlineDataQuery } from "../../../../../../api/chartsApi/lineApi.js";
import { Loading } from "../../../../../../components/loading/Loading.jsx";

export const AreaCharts = (props) => {
  const { colors: { backgroundColor = "white" } = {}, instrument } = props;
  const { data, isLoading } = useGetlineDataQuery({
    asset: instrument.split("|")[0].trim(),
    time: "1d",
  });

  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: "solid", color: "rgba(7, 46, 61, 0.4)" },
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

    // chart Type
    const newSeries = chart.addAreaSeries({
      lineColor: "#65686e",
      topColor: "#06225b",
      bottomColor: "rgba(30, 114, 27, 0.75)",
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
        toolTip.innerHTML = `<div style="color: ${"rgba( 38, 166, 154, 1)"}; font-weight: bolder; margin-top:2px; ">${
          instrument.split("|")[0]
        }</div><div style="font-size: 20px; margin: 1px 0px; color: ${"black"}">
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

  return (
    <>
      {isLoading ? (
        <Loading />
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
