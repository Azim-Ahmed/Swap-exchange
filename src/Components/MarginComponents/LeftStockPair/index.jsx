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

const useStyles = makeStyles({
  table: {
    maxWidth: 450,
  },
});
/**
 *@function LeftStockPair.jsx
 *@author Azim
 *
 **/
export default function LeftStockPair({
  crytoNames,
  newStockPairs,
  handleChangeData,
  handleFiltered,
}) {
  const classes = useStyles();

  return (
    <Box>
      <Box>
        <Box style={{ background: "white" }}>
          {crytoNames.map((item, index) => (
            <Button onClick={() => handleFiltered(item)} key={index}>
              {item.item}
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
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
                  Price
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                  align="left"
                >
                  Change
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newStockPairs.map((row, index) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
