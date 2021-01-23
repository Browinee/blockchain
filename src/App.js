import React, {useState, useEffect, useRef} from "react";
import { ThemeProvider } from 'styled-components'
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
  xMax: 30,
  yMax: 30,
  periodStart: [6],
  periodStop: [25],
};
const ThemeConfig = {
  zIndex: {
    investClickArea: 10
  }
};

function App() {
  const [chartData, setChart] = useState(ChartData);
  // const startIndex = useRef(11);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setChart(old => {
  //        const newI = startIndex.current + 1;
  //       const newData = [...old.data];
  //       console.log("newData", newData);
  //       newData.push({x:newI , y: Math.random() * 30});
  //       const xAxisTicks = [...old.xAxisTicks];
  //       xAxisTicks.push(newI);
  //       startIndex.current = newI;
  //       return {
  //         ...old,
  //         data: newData,
  //         xAxisTicks,
  //       }
  //     })
  //   }, 2000);
  //   return () => {
  //     clearInterval(id);
  //   }
  // }, []);
  return (
    <div className="App">
      <ThemeProvider theme={ThemeConfig}>
        <LineAreaChart chartData={chartData} highHandler={() => {}} lowHandler={() => {}}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
