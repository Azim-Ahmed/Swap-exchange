import { Box, Grid } from "@material-ui/core";
import {
  getAllCrypto,
  getAllStockPair,
  getConditionedData,
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

/**
 *@function Margin.jsx
 *@author Azim
 *
 **/

const Margin = (props) => {
  const dispatch = useDispatch();
  const { crytoNames, stockPairs, singlePairData } = useSelector(
    (state) => state.margin
  );
  const [newStockPairs, setNewStockPairs] = useState([]);
  useEffect(() => {
    dispatch(getAllCrypto());
    dispatch(getAllStockPair());
  }, [dispatch]);
  useEffect(() => {
    if (stockPairs.length) {
      setNewStockPairs(stockPairs);
    }
  }, [stockPairs]);
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
        <Grid mt="20px" xs={12} md={8} lg={8} item>
          <CandleStick />
          <Box
            // style={{ backgroundColor: "white" }}
            style={{ backgroundColor: "#131a33", color: "white" }}
          >
            <BuyAndSell newStockPairs={newStockPairs} />
          </Box>
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
