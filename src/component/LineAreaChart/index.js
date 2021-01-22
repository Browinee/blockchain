import React from "react";
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
import "./style.css";

function LineAreaChart(props) {
  const {
    data,
    circleSize,
    yAxisPeriodStart,
    yAxisPeriodEnd,
    xAxisLatestValueRefereceLine,
  } = props.chartData;
  const xTickFormatHandler = (v) => v;
  const yTickFormatHandler = (v) => v;
  const yAxisPeriodTitle = (position, value) => {
    return `${position}: ${value}`;
  };
  return (
    <div>
    <XYPlot height={300} width={300}>
      <VerticalGridLines
        style={{
          backgroundColor: "black",
        }}
      />
      <HorizontalGridLines />
      <XAxis
        tickSizeOuter={0}
        tickSizeInner={0}
        tickFormat={xTickFormatHandler}
        tickValues={[1, 2, 3, 4, 5, 6, 7]}
        tickTotal={20}
        style={{
          line: {
            stroke: "black",
          },
        }}
      />
      <YAxis
        tickSizeInner={0}
        tickSizeOuter={0}
        tickFormat={yTickFormatHandler}
        style={{
          line: {
            stroke: "black",
          },
        }}
      />

      <AreaSeries
        className="area-series-example"
        curve="linear"
        data={data}
        fill="#FBD241"
        stroke="transparent"
      />
      <LineSeries stroke="#D98C14" data={data} />
      {/* 為了畫出配合x軸畫出剩餘空白的部分*/}
      <LineSeries
        stroke="transparent"
        data={data.concat([
          { x: 6, y: 20 },
          { x: 7, y: 29 },
        ])}
      />


      {/* 為了畫出區隔線*/}
      <YAxis
        left={yAxisPeriodStart}
        position="end"
        hideTicks
        title={yAxisPeriodTitle("Start", "06:00")}
        style={{
          title: { transform: "translate(-8px, 5px)" },
          line: {
            stroke: "black",
          },
        }}
      />
      <YAxis
        left={yAxisPeriodEnd}
        position="end"
        hideTicks
        title={yAxisPeriodTitle("Stop", "06:00")}
        style={{
          title: { transform: "translate(-8px, 5px)" },
          line: {
            stroke: "black",
          },
        }}
      />

       {/* 為了畫出最新值的參考線*/}

       <XAxis
        hideTicks
        top={100}
        style={{
          line: {
            stroke: "black",
            strokeDasharray: "4"
          },
        }}
      />
       <MarkSeries
        className="mark-series-example"
        sizeRange={circleSize}
        data={data.slice(-1)}
        fill="white"
      />
    </XYPlot>
    </div>
  );
}
LineAreaChart.propTypes = {
  data: [],
  circleSize: PropTypes.arrayOf(PropTypes.number),
  yAxisPeriodStart: PropTypes.number,
  yAxisPeriodEnd: PropTypes.number,
  xAxisLatestValueRefereceLine: PropTypes.number,
};

export default LineAreaChart;