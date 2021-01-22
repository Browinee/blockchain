import './App.css';
import PropTypes from 'prop-types';
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
  MarkSeries
} from "react-vis";
import '../node_modules/react-vis/dist/style.css';

function Chart(props) {
  const {data, circleSize, yAxisPeriodStart, yAxisPeriodEnd} = props.chartData;
  const xTickFormatHandler = (v) => v;
  const yTickFormatHandler = (v) => v;
  const yAxisPeriodTitle = (position, value) => {
    return `${position}: ${value}`;
  };
  return (
    <XYPlot height={300} width= {300}>
      <VerticalGridLines style={{fill: "blue"}}/>
      <HorizontalGridLines />
      <XAxis tickSizeOuter={0} tickFormat={xTickFormatHandler} tickValues={[1,2,3,4,5,6,7]} tickTotal={20}/>
      <YAxis tickSizeOuter={0} tickFormat={yTickFormatHandler} />

      {/* 為了畫出區隔線*/}
      <YAxis left={yAxisPeriodStart} position="end" hideTicks title={yAxisPeriodTitle("Start", "06:00")} style={{
        title: { transform: "translate(-8px, 5px)"},
      }}/>
      <YAxis left={yAxisPeriodEnd} position="end" hideTicks title={yAxisPeriodTitle("Stop", "06:00")} style={{
        title: { transform: "translate(-8px, 5px)"},
      }}/>
      <AreaSeries
        className="area-series-example"
        curve="linear"
        data={data}
        fill="#FBD241"
        stroke="transparent"
      />
      <LineSeries   stroke="#D98C14" data={data} />
      {/* 為了畫出配合x軸畫出剩餘空白的部分*/}
      <LineSeries  stroke="transparent" data={data.concat([{x:6, y: 20}, {x:7, y: 29}])} />
      <MarkSeries
            className="mark-series-example"
            sizeRange={circleSize}
            data={data.slice(-1)}
            fill="white"
            // stroke="white"
            />

    </XYPlot>
  )
}
Chart.propTypes = {
  data: [],
  circleSize: PropTypes.arrayOf(PropTypes.number),
  yAxisPeriodStart: PropTypes.number,
  yAxisPeriodEnd: PropTypes.number,

};
function App() {
const chartData = {
  data: [{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 10}, {x: 5, y: 20}],
  circleSize: [2],
  yAxisPeriodStart: 50,
  yAxisPeriodEnd: 50
}
  return (
    <div className="App">
      <Chart chartData={chartData} />
    </div>
  );
}

export default App;
