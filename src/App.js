import React, {useState, useEffect} from "react";

import LineAreaChart from "./component/LineAreaChart";
const ChartData = {
  data: [
    { x: 1, y: 10 },
    { x: 2, y: 5 },
    { x: 3, y: 15 },
    { x: 4, y: 10 },
    { x: 6, y: 20 },
    { x: 7, y: 20 },
    { x: 8, y: 20 },
    { x: 9, y: 20 },
    { x: 10, y: 17 },
  ],
  xAxisTicks:[2,4,5,6,8,10],
  yAxisTicks: [0, 2,5,6,9,15, 20, 25,30],
  yAxisPeriodStart: 50,
  yAxisPeriodEnd: 250,
  xAxisLatestValueRefereceLine: 100,
  xMax: 15,
  yMax: 30,
  periodStart: [6],
  periodStop: [10],
};
function App() {
  const [chartData, setChart] = useState(ChartData);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     let i = 11;
  //     setChart(old => {
  //       i += 1;
  //       const newData = [...old.data];
  //       newData.push({x: i, y: Math.random() * 30});
  //       for (let j = 1 ; j <4; j++){
  //         i+=1;
  //         newData.push({x: i, y: null})

  //       }
  //       console.log("newData", newData);
  //       const newXAxisTicks = [...old.xAxisTicks];
  //       newXAxisTicks.push(i);
  //       return {
  //         ...old,
  //         data: newData,
  //         xAxisTicks:newXAxisTicks,
  //       }
  //     })
  //   }, 20000)
  //   return () => {
  //     clearInterval(id);
  //   }
  // }, []);
  return (
    <div className="App">
      <LineAreaChart chartData={chartData} />
    </div>
  );
}

export default App;
