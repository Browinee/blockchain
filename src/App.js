import React, {useState, useEffect} from "react";
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
  xMax: 15,
  yMax: 30,
  periodStart: [6],
  periodStop: [10],
};
const ThemeConfig = {
  zIndex: {
    investClickArea: 10
  }
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
  //       return {
  //         ...old,
  //         data: newData,
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
