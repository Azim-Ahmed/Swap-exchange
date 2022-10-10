import { Grid, Typography, Box } from "@material-ui/core";
import { images } from "assets";
const SignBanner = (props) => {
  return (
    <Grid
      item
      md={6}
      lg={6}
      sm={12}
      xs={12}
      style={{
        background: "#F3F3F3",
        minHeight: "100vh",
        color: "#373A4D",
        display: "flex",
        justifyContent: "center",
        padding: "3.6rem 0rem",
      }}
    >
      <img
        src={images.updatedHomeLogo}
        style={{
          fontFamily:'Asap',
          height: "102px",
          width: "240px",
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: "32px",
          marginLeft: "31px",
        }}
        alt=""
      />
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <img
          style={{
            textAlign: "center",
            marginTop: "30px",
            width: "510px",
            height: "510px",
          }}
          src={images.login}
          alt="login"
        />
        <Box m="30px">
          <Typography
            style={{ fontWeight: "600", fontSize: "34px" }}
            align="center"
            variant="h5"
          >
            Helping product teams deliver great technology quickly
          </Typography>
          <Typography
            style={{ fontWeight: "300", fontSize: "24px" }}
            align="center"
          >
            using Dynamic User Stories <sup>TM</sup>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default SignBanner;
