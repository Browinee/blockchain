import React from "react";

import LineAreaChart from "./component/LineAreaChart";

function App() {
  const chartData = {
    data: [
      { x: 1, y: 10 },
      { x: 2, y: 5 },
      { x: 3, y: 15 },
      { x: 4, y: 10 },
      { x: 5, y: 20 },
    ],
    circleSize: [2],
    yAxisPeriodStart: 50,
    yAxisPeriodEnd: 250,
    xAxisLatestValueRefereceLine: 100,
  };
  return (
    <div className="App">
      <LineAreaChart chartData={chartData} />
    </div>
  );
}

export default App;
