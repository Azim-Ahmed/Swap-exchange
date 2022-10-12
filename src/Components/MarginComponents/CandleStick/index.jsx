// import { Box } from "@material-ui/core";
import { ApexData } from "assets/Data";
// import { getTime, getUnixTime } from "date-fns";
import React, { useEffect, useState } from "react";
// import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
// import { useSelector } from "react-redux";
const CandleStick = ({ candleData }) => {
  console.log({ candleData, ApexData });
  const statedData = {
    series: [
      {
        data: candleData,
        // data: ApexData,
        // data: [
        //   {
        //     x: "2018-10-05T22:30:00.000Z",
        //     y: [0.01554998, 0.05854998, 0.01554998, 0.02854998],
        //   },
        //   {
        //     x: "2018-10-05T22:30:00.000Z",
        //     y: [0.02854998, 0.07854998, 0.01854998, 0.04854998],
        //   },
        // ],
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };
  const [chartState, setChartState] = useState(statedData);

  return (
    <div id="chart">
      {chartState.options && (
        <ReactApexChart
          options={chartState.options}
          series={chartState?.series}
          type="candlestick"
          height={350}
        />
      )}
    </div>
  );
};
export default CandleStick;
