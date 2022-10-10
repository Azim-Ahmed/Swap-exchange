import { Box, Grid } from "@material-ui/core";
import { SellForm, BuyForm } from "Components/MarginComponents";

/**
 *@function BuyAndSell.jsx
 *@author Azim
 *
 **/

const BuyAndSell = (props) => {
  return (
    <Box
      padding="15px"
      //   style={{ backgroundColor: "#131a33", color: "white" }}
    >
      <Box ml="20px">
        <h4
          style={{
            padding: "20px",
            border: "2px solid gray",
            display: "inline-block",
            borderRadius: "5px",
          }}
        >
          Market
        </h4>
      </Box>
      <Grid spacing={3} container>
        <Grid item xs={12} md={6}>
          <BuyForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <SellForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuyAndSell;
