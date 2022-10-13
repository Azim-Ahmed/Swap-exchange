import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button } from "@material-ui/core";
import { TableCellUse } from "Components/Reusable";

const useStyles = makeStyles({
  table: {
    maxWidth: 450,
  },
  root: {
    "& .MuiTableContainer-root": {
      height: "300px",
    },
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
    <Box className={classes.root}>
      <Box>
        <Box style={{ background: "#131a33" }}>
          {crytoNames.map((item, index) => (
            <Button
              style={{
                color: "white",
                marginRight: "8px",
                marginBottom: "8px",
              }}
              variant="outlined"
              color="primary"
              onClick={() => handleFiltered(item)}
              key={index}
            >
              {item?.item}
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCellUse maxWidth="20px" head name="Coin" />
                <TableCellUse maxWidth="15px" head name="Price" />
                <TableCellUse maxWidth="20px" head name="Change" />
              </TableRow>
            </TableHead>
            <TableBody>
              {newStockPairs.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleChangeData(row)}
                  style={{ maxWidth: "240px" }}
                >
                  <TableCellUse
                    name={`${row.stock_item?.item}/${row.base_item?.item}`}
                    component="th"
                    scope="row"
                  />
                  <TableCellUse name={row.last_price} />
                  <TableCellUse name={row.exchange_24} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
