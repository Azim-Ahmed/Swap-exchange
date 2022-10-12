import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { TableCellUse } from "Components/Reusable";

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
export default function ActiveOrders({
  tableData,
  handleChangeData,
  balance,
  stockPairs,
}) {
  const classes = useStyles();

  const getCoinName = (id) => {
    const getCoin = stockPairs.find((item) => item.id === id);
    const coinName = `${getCoin?.base_item?.item}/${getCoin?.stock_item?.item}`;
    return coinName;
  };
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
                tableData.map((row, index) =>
                  balance ? (
                    <TableRow
                      key={index}
                      onClick={() => handleChangeData(row)}
                      style={{ maxWidth: "240px" }}
                    >
                      <TableCellUse
                        style={{ maxWidth: "20px" }}
                        name={new Date(row?.created_at).toLocaleDateString(
                          "en-US"
                        )}
                      />
                      <TableCell style={{ fontSize: "11px" }} align="left">
                        {row.price}
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }} align="left">
                        {row.amount}
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }} align="left">
                        {row.maker_fee}
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }} align="left">
                        {row.exchange_24}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      key={index}
                      onClick={() => handleChangeData(row)}
                      style={{ maxWidth: "240px" }}
                    >
                      <TableCellUse
                        name={new Date(row?.created_at).toLocaleDateString(
                          "en-US"
                        )}
                      />
                      <TableCellUse name={getCoinName(row.stock_pair_id)} />
                      <TableCellUse
                        name={row.exchange_type === 1 ? "Buy" : "Sell"}
                      />
                      <TableCellUse name={row.price} />
                      <TableCellUse name={row.amount} />
                      <TableCellUse name={row.maker_fee} />
                      <TableCellUse name={row.exchange_24} />
                    </TableRow>
                  )
                )
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell
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
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
