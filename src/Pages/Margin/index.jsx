import { Box, Grid } from "@material-ui/core";
import {
  getAllCrypto,
  getAllStockPair,
  getConditionedData,
  getOrderHistory,
} from "redux/actions";
import {
  OrderBook,
  LeftStockPair,
  CandleStick,
  BottomActive,
  BuyAndSell,
} from "Components/MarginComponents";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTime } from "date-fns";

/**
 *@function Margin.jsx
 *@author Azim
 *
 **/

const Margin = (props) => {
  const dispatch = useDispatch();
  const { crytoNames, stockPairs, singlePairData, candleData } = useSelector(
    (state) => state.margin
  );
  const [newStockPairs, setNewStockPairs] = useState([]);
  const [caldleData, setCandleData] = useState([]);
  useEffect(() => {
    dispatch(getAllCrypto());
    dispatch(getAllStockPair());
  }, [dispatch]);
  useEffect(() => {
    if (stockPairs.length) {
      setNewStockPairs(stockPairs);
    }
  }, [stockPairs]);
  // useEffect(() => {
  //   dispatch(getOrderHistory(1));
  // }, [dispatch]);
  // console.log({ orderHistory });
  console.log("az", { singlePairData });
  useEffect(() => {
    if (newStockPairs.length) {
      const newStockPairsFinX = newStockPairs.find(
        (item) => item.is_default === 1
      );
      dispatch(getConditionedData(newStockPairsFinX));
    }
  }, [dispatch, newStockPairs]);
  const handleChangeData = (fullStockRow) => {
    dispatch(getConditionedData(fullStockRow));
  };
  const handleFiltered = (item) => {
    const filteredState = stockPairs.filter(
      (items) => items?.base_item?.item === item?.item
    );
    setNewStockPairs(filteredState);
  };

  useEffect(() => {
    if (candleData.length) {
      const newStructured = candleData.map((item) => {
        const newData = {};
        newData.x = new Date(getTime(new Date(item.created_at.slice(0, -1))));
        newData.y = [item?.open, item?.high, item?.low, item?.close];
        console.log({ newData });
        return newData;
      });
      setCandleData(newStructured);
    }
  }, [candleData]);
  // const newStructured = candleData.map((item) => {
  //   const newData = {};
  //   // newData.x = new Date(1538778600000);
  //   newData.x = new Date(getTime(new Date(item.created_at.slice(0, -1))));

  //   newData.y = [item?.open, item?.high, item?.low, item?.close];
  //   console.log({ newData });
  //   return newData;
  // });
  // console.log({ singlePairData, candleData });
  return (
    <Box mt="40px" style={{ backgroundColor: "#131a33" }}>
      <Grid spacing={1} container>
        <Grid xs={12} md={2} lg={2} item>
          <LeftStockPair
            handleChangeData={handleChangeData}
            crytoNames={crytoNames}
            newStockPairs={newStockPairs}
            handleFiltered={handleFiltered}
          />
          <OrderBook RecentTrades singlePairData={singlePairData} />
        </Grid>
        <Grid
          mt="20px"
          style={{ backgroundColor: "white" }}
          xs={12}
          md={8}
          lg={8}
          item
        >
          <CandleStick candleData={caldleData} />
          <BuyAndSell newStockPairs={newStockPairs} />
        </Grid>
        <Grid xs={12} md={2} lg={2} item>
          <OrderBook singlePairData={singlePairData} />
        </Grid>
        <Grid xs={12} md={12} lg={12} item>
          <BottomActive />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Margin;
