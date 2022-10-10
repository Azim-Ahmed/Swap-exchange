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
import { TableCellUse } from "Components/Reusable";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
  tableStyle: {
    maxWidth: 650,
  },
  tradeTable: {
    maxWidth: 450,
  },
});

/**
 *@function OrderBook.jsx
 *@author Azim
 *
 **/
export default function OrderBook({ RecentTrades, singlePairData }) {
  // 1b, 2s
  const buyOrderBook = singlePairData.filter(
    (item) => item.exchange_type === 1
  );
  const sellOrderBook = singlePairData.filter(
    (item) => item.exchange_type === 2
  );
  const classes = useStyles();

  return (
    <Box>
      {RecentTrades ? (
        <Box>
          <Box
            style={{
              background: "white",
              border: "2px solid orange",
              borderRadius: "8px",
            }}
          >
            <p
              style={{
                background: "white",
                padding: "8px",
                border: "2px solid orange",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              Recent Trades
            </p>
          </Box>
          <TableContainer component={Paper}>
            <Table
              className={classes.tradeTable}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCellUse maxWidth="20px" head name="Price(BTC)" />
                  <TableCellUse maxWidth="20px" head name="Amount(USD)" />
                  <TableCellUse maxWidth="20px" head name="Time" />
                </TableRow>
              </TableHead>
              <TableBody>
                {singlePairData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCellUse
                      style={{ maxWidth: "40px" }}
                      component="th"
                      scope="row"
                      name={row?.price}
                    />
                    <TableCellUse
                      style={{ maxWidth: "10px" }}
                      name={row?.amount}
                    />
                    <TableCellUse
                      style={{ maxWidth: "20px" }}
                      name={new Date(row?.created_at).toLocaleDateString(
                        "en-US"
                      )}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCellUse maxWidth="20px" head name="Time" />
                  <TableCellUse maxWidth="20px" head name="Price" />
                  <TableCellUse maxWidth="20px" head name="Volume" />
                </TableRow>
              </TableHead>
              <TableBody>
                {buyOrderBook.map((row, index) => (
                  <TableRow key={index}>
                    <TableCellUse
                      style={{ maxWidth: "40px" }}
                      component="th"
                      scope="row"
                      name={new Date(row?.created_at).toLocaleDateString(
                        "en-US"
                      )}
                    />
                    <TableCellUse
                      style={{ maxWidth: "10px", color: "red" }}
                      name={row?.price}
                    />
                    <TableCellUse
                      style={{ maxWidth: "10px" }}
                      name={row?.volume}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt="20px">
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCellUse maxWidth="20px" head name="Time" />
                    <TableCellUse maxWidth="20px" head name="Price" />
                    <TableCellUse maxWidth="20px" head name="Volume" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellOrderBook.map((row, index) => (
                    <TableRow key={index}>
                      <TableCellUse
                        style={{ maxWidth: "40px" }}
                        component="th"
                        scope="row"
                        name={new Date(row?.created_at).toLocaleDateString(
                          "en-US"
                        )}
                      />
                      <TableCellUse
                        style={{ maxWidth: "10px", color: "green" }}
                        name={row?.price}
                      />
                      <TableCellUse
                        style={{ maxWidth: "10px" }}
                        name={row?.volume}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Box>
  );
}
