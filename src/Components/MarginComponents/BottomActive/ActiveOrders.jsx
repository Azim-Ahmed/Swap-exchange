import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 1050,
  },
});
/**
 *@function ActiveOrders.jsx
 *@author Azim
 *
 **/
export default function ActiveOrders({ tableData, handleChangeData, balance }) {
  const classes = useStyles();

  return (
    <Box>
      <Box>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              {balance ? (
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Time
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Fee
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Total Balance
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Time
                  </TableCell>

                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Coin
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Buy/sell
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Fee
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                    align="left"
                  >
                    Total Profit
                  </TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {tableData ? (
                tableData.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleChangeData(row)}
                    style={{ maxWidth: "240px" }}
                  >
                    <TableCell
                      style={{ fontSize: "11px" }}
                      align="left"
                      component="th"
                      scope="row"
                    >
                      {`${row.stock_item?.item}/${row.base_item?.item}`}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "11px", maxWidth: "80px" }}
                      align="left"
                    >
                      {row.last_price}
                    </TableCell>
                    <TableCell style={{ fontSize: "11px" }} align="left">
                      {row.exchange_24}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableBody>
                  <p
                    style={{
                      fontSize: "11px",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <Link
                      style={{
                        fontWeight: "600",
                        color: "black",
                      }}
                      to="/login"
                    >
                      Login
                    </Link>{" "}
                    or{" "}
                    <Link
                      style={{ color: "black", fontWeight: "600" }}
                      to="register"
                    >
                      Signup now
                    </Link>{" "}
                    to trade
                  </p>
                </TableBody>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
