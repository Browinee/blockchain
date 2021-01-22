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
import "./style.css";

const config = {
  circleSize: [2],
  chartWidth: 650,
  chartHeight: 350,
  offset: {
    markerOffset: 10,
    periodHeightOffset: 50
  }
}


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
  const {circleSize, chartWidth, chartHeight, offset: {markerOffset, periodHeightOffset}} = config;
  const xTickFormatHandler = (v) => `Start: 06${v}`
  const yTickFormatHandler = (v) => v;
  const yAxisPeriodTitle = (position, value) => {
    return `${position}: ${value}`;
  };
  const [referencePosition, setReference] = useState(0);
  const getReferenceLinePosition = () => {
    const marker = document.querySelector(".mark-series > circle");
    if(marker) {
      const cy = +marker.attributes.cy.value;
      setReference(cy + markerOffset);
    }
  }
  const [periodHeight, setPeriodHeight] = useState(chartHeight - periodHeightOffset);
  useEffect(() => {
    setPeriodHeight(chartHeight - periodHeightOffset);
  }, [chartHeight]);
  useEffect(() => {
    getReferenceLinePosition();
  }, [data]);

  return (
    <div>
    <XYPlot height={chartHeight} width={chartWidth} >
      {/* 用AreaSeries畫出背景，要放在第一個 */}
    <AreaSeries
        className="area-series"
        curve="linear"
        data={[{x:0, y:yMax}, {x:xMax, y:yMax}]}
        fill="#2B2B2B"
        stroke="transparent"
      />
      <VerticalGridLines style={{stroke: "black"}} className="verticalGridLine" />
      <HorizontalGridLines style={{stroke: "black"}}/>
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
            stroke: "black",
          },
        }}
      />


      <LineSeries stroke="#D98C14" data={data} />
      {/* 為了畫出配合x軸畫出剩餘空白的部分*/}
      {/* <LineSeries
        stroke="transparent"
        data={emptyData}
      /> */}


      {/* 為了畫出區隔線*/}
      {/* <YAxis
        left={periodStartPosition}
        position="end"
        hideTicks
        title={yAxisPeriodTitle("Start", periodStart)}
        style={{
          title: { transform: "translate(-8px, 5px)" },
          line: {
            // stroke: "white",
          },
        }}
      />
      <YAxis
        left={periodEndPosition}
        position="end"
        hideTicks
        title={yAxisPeriodTitle("Stop", periodStop)}
        style={{
          title: { transform: "translate(-8px, 5px)" },
          line: {
            // stroke: "white",
          },
        }}
      /> */}

      <XAxis
        className="XAxisPeriodStart"
        tickSizeOuter={0}
        tickSizeInner={periodHeight}
        tickFormat={xTickFormatHandler}
        tickValues={periodStart}
        hideLine
        style={{
          text: {
            stroke: "white",
            transform: `translate(-40px, ${-periodHeight + 20}px)`,
          }
        }}
      />
      <XAxis
        className="XAxisPeriodEnd"
        tickSizeOuter={0}
        tickSizeInner={periodHeight}
        tickFormat={xTickFormatHandler}
        tickValues={periodStop}
        position="start"
        hideLine
        style={{
          text: {
            stroke: "white",
            transform: `translate(-40px, ${-periodHeight + 20}px)`,
          }
        }}
      />


       {/* 為了畫出最新值的參考線*/}

       <XAxis
        hideTicks
        top={referencePosition}
        style={{
          line: {
            stroke: "white",
            strokeDasharray: "4"
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
    </div>
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