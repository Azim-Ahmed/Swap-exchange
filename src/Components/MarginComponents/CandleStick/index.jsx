// import { ApexData } from "assets/Data";
import { getTime } from "date-fns";
// import { getTime, getUnixTime } from "date-fns";
import React from "react";
// import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
const CandleStick = () => {
  const { candleData } = useSelector((state) => state.margin);
  const newStructured = candleData.map((item) => {
    const newData = {};
    newData.x = new Date(getTime(new Date(item.created_at.slice(0, -1))));
    newData.y = [item?.open, item?.high, item?.low, item?.close];
    return newData;
  });
  const statedData = {
    series: [
      {
        data: newStructured,
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
  return (
    <div id="chart">
      {newStructured.length && (
        <ReactApexChart
          options={statedData?.options}
          series={statedData?.series}
          type="candlestick"
          height={350}
        />
      )}
    </div>
  );
};
export default CandleStick;
