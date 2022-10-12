import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ActiveOrders from "./ActiveOrders";
import { useDispatch, useSelector } from "react-redux";

import { getOrderHistory } from "redux/actions";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "black",
  },
  appBar__: {
    backgroundColor: "black",
  },
}));

export default function BottomActive() {
  const dispatch = useDispatch();
  const { orderHistory, stockPairs } = useSelector((state) => state.margin);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    dispatch(getOrderHistory(1));
  }, [dispatch]);
  console.log({ orderHistory });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar__} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="ACTIVE ORDERS" {...a11yProps(0)} />
          <Tab label="CLOSED ORDERS" {...a11yProps(1)} />
          <Tab label="BALANCE" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ActiveOrders stockPairs={stockPairs} tableData={orderHistory} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActiveOrders stockPairs={stockPairs} tableData={orderHistory} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ActiveOrders tableData={orderHistory} balance />
      </TabPanel>
    </div>
  );
}
