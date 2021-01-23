import React, { useEffect, useState } from "react";
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  AreaSeries,
  LineMarkSeries,
  LineSeries,
  LabelSeries,
  MarkSeries,
} from "react-vis";
import "react-vis/dist/style.css";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./style.css";
import up from "./images/up.png";
import down from "./images/down.png";

const config = {
  circleSize: [2],
  chartWidth: 500,
  chartHeight: 550,
  offset: {
    markerOffset: 10,
    periodHeightOffset: 50,
    referenceOffset: 50,
    investClickerUpOffset: 25,
    investClickerDownOffset: 55,
  },
};

const StyledLineAreaChart = styled.div`
  position: relative;
`;
const StyledInvestClickArea = styled.div`
  position: absolute;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  z-index: ${(props) => props.theme.zIndex.investClickArea};

`;

const StyledClick = styled.div`
  width: 27px;
  height: 27px;
  margin-bottom: 15px;
  cursor: pointer;
  background-image: url(${props => props.up ? up : down});
`;
function LineAreaChart(props) {
  const {
    data,
    yAxisPeriodStart,
    yAxisPeriodEnd,
    xAxisLatestValueRefereceLine,
    xAxisTicks,
    yAxisTicks,
    xMax,
    yMax,
    periodStart,
    periodStop,
  } = props.chartData;
  const { highHandler, lowHandler } = props;
  const {
    circleSize,
    chartWidth,
    chartHeight,
    offset: { markerOffset, periodHeightOffset, referenceOffset, investClickerUpOffset, investClickerDownOffset },
  } = config;
  const xTickFormatHandler = (v, status) => `${status}: 06${v}`;
  const yTickFormatHandler = (v) => v;
  const yAxisPeriodTitle = (position, value) => {
    return `${position}: ${value}`;
  };

  const [investClickPosition, setInvestPosition] = useState({
    top: 0,
    left: 0,
  });
  const getReferenceLinePosition = () => {
    const marker = document.querySelector(".mark-series > circle");
    if (marker) {
      const cy = +marker.attributes.cy.value - investClickerUpOffset;
      const cx = +marker.attributes.cx.value + investClickerDownOffset;
      setInvestPosition({
        top: cy,
        left: cx,
      });
    }
  };
  const [periodHeight, setPeriodHeight] = useState(
    chartHeight - periodHeightOffset
  );
  const [periodWidth, setPeriodWidth] = useState(
    chartWidth - referenceOffset
  );
  useEffect(() => {
    setPeriodHeight(chartHeight - periodHeightOffset);
  }, [chartHeight]);
  useEffect(() => {
    setPeriodWidth(chartWidth - referenceOffset);
  }, [chartWidth]);
  useEffect(() => {
    getReferenceLinePosition();
  }, [data]);

  const referencePosition = [data.slice(-1)[0].y];
  return (
    <StyledLineAreaChart>
      <StyledInvestClickArea position={investClickPosition}>
        <StyledClick up />
        <StyledClick down />
      </StyledInvestClickArea>
      <XYPlot height={chartHeight} width={chartWidth}>
        {/* 用AreaSeries畫出背景，要放在第一個 */}
        <AreaSeries
          className="area-series"
          curve="linear"
          data={[
            { x: 0, y: yMax },
            { x: xMax, y: yMax },
          ]}
          fill="#2B2B2B"
          stroke="transparent"
        />
        <VerticalGridLines
          style={{ stroke: "black" }}
          className="verticalGridLine"
        />
        <HorizontalGridLines style={{ stroke: "black" }} />
        <XAxis
          tickSizeOuter={0}
          tickSizeInner={0}
          tickValues={xAxisTicks}
          style={{
            line: {
              stroke: "black",
            },
          }}
        />
        <YAxis
          tickSizeInner={0}
          tickSizeOuter={0}
          tickValues={yAxisTicks}
          style={{
            line: {
              stroke: "white",
            },
          }}
        />
        <LineSeries stroke="#D98C14" data={data} />
        {/* 畫出區間線 */}
        <XAxis
          className="XAxisPeriodStart"
          tickSizeOuter={0}
          tickSizeInner={periodHeight}
          tickFormat={(v) => xTickFormatHandler(v, "Start")}
          tickValues={periodStart}
          hideLine
          style={{
            text: {
              stroke: "white",
              transform: `translate(-40px, ${-periodHeight + 20}px)`,
            },
          }}
        />
        <XAxis
          className="XAxisPeriodEnd"
          tickSizeOuter={0}
          tickSizeInner={periodHeight}
          tickFormat={(v) => xTickFormatHandler(v, "Stop")}
          tickValues={periodStop}
          position="start"
          hideLine
          style={{
            text: {
              stroke: "white",
              transform: `translate(-40px, ${-periodHeight + 20}px)`,
            },
          }}
        />
        {/* 為了畫出最新值的參考線 */}
        <YAxis
          className=""
          tickSizeOuter={0}
          tickSizeInner={periodWidth}
          tickFormat={() => {}}
          tickValues={referencePosition}
          hideLine
          style={{
            line: {
              stroke: "white",
              strokeDasharray: "4",
            },
          }}
        />
        <MarkSeries
          className="mark-series"
          sizeRange={circleSize}
          data={data.slice(-1)}
          fill="white"
          stroke="white"
        />
      </XYPlot>
    </StyledLineAreaChart>
  );
}
LineAreaChart.propTypes = {
  data: PropTypes.array,
  xAxisTicks: PropTypes.array,
  yAxisTicks: PropTypes.array,
  yAxisPeriodStart: PropTypes.number,
  yAxisPeriodEnd: PropTypes.number,
  xAxisLatestValueRefereceLine: PropTypes.number,
  highHandler: PropTypes.func,
  lowHandler: PropTypes.func,
  xMax: PropTypes.any,
  yMax: PropTypes.any,
  periodStart: PropTypes.string,
  periodStop: PropTypes.string,
};

export default LineAreaChart;
