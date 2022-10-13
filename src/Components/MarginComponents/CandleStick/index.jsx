import { makeStyles } from "@material-ui/styles";
import { getTime } from "date-fns";
import React from "react";
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
      tooltip: {
        enabled: true,

        theme: false,
        style: {
          fill: "black",
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };
  const useStyles = makeStyles({
    candleStick: {
      "& .apexcharts-theme-light": {
        backgroundColor: "#131a33",
        color: "white",
      },
      "& .apexcharts-text, .apexcharts-title-text": {
        fill: "white",
      },
    },
  });
  const classes = useStyles();
  return (
    <div id="chart">
      {newStructured.length && (
        <ReactApexChart
          className={classes.candleStick}
          options={statedData?.options}
          series={statedData?.series}
          type="candlestick"
          height={300}
        />
      )}
    </div>
  );
};
export default CandleStick;
