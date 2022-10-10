import {
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, pageMove } from "redux/actions";
import { SignBanner } from "Components/Reusable";
import { CssTextField } from "Components/Reusable";

/**
 *@function Login.jsx
 *@author Azim
 *
 **/
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const location = window?.location?.href;

  //RHF
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const onSubmit = (data) => {
    const { username, password } = data;
    let newData = { password };
    newData.username = username.toLowerCase();
    if (newData) {
      dispatch(login(newData));
    }
  };
  //states of login Component
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  //modal states

  if (auth.authenticate) {
    return <Redirect to="/project" />;
  }
  return (
    <section className={classes.loginContainer}>
      <Grid container>
        <SignBanner />
        <Grid className={classes.loginFormStyle} item md={6}>
          <Box style={{ maxWidth: "428px", margin: "1rem" }}>
            <Typography className={classes.welcomeMessage}>
              Hello <span className={classes.helloSign}>👋</span>
            </Typography>
            <Typography className={classes.signUpWriting}>
              Sign into your account. Don’t have one?
              <Link onClick={() => dispatch(pageMove())} to="/signup">
                <span className={classes.signUpSpanWriting}> Sign up now.</span>
              </Link>
            </Typography>
            <Typography
              style={{ color: "red", padding: "10px 0px", fontWeight: "600" }}
            >
              {auth?.state?.error}
            </Typography>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Entered value does not match email format",
                  },
                }}
                defaultValue={
                  location === "http://localhost:3000/login"
                    ? "azimaahmed36@gmail.com"
                    : ""
                }
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    // fullWidth
                    style={{width: "428px"}}
                    type="email"
                  />
                )}
              />
              {errors.username && (
                <Typography style={{ color: "red" }}>
                  {errors.username.message}
                </Typography>
              )}
              {errors.username?.type === "required" && (
                <Typography
                  style={{ color: "red" }}
                >{`Enter your valid mail`}</Typography>
              )}
              <Controller
                name="password"
                control={control}
                defaultValue={
                  location === "http://localhost:3000/login"
                    ? "azimaahmed36@gmail.com"
                    : ""
                }
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <CssTextField
                    variant="outlined"
                    // style={{ minWidth: "428px" }}
                    {...field}
                    fullWidth
                    label="Password"
                    type={values.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              {errors.password?.type === "required" && (
                <Typography style={{ color: "red" }}>
                  Password is required
                </Typography>
              )}

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "20px 0px",
                }}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                </Box>
                <Box>
                  <Link
                    style={{
                      color: "#373A4D",
                      textDecoration: "underline",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 400,
                    }}
                    to="/forgot-password"
                  >
                    I've forgot password
                  </Link>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "20px 0px",
                }}
              >
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.loginButton}
                >
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

export default Login;

//Material Ui css

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      maxWidth: "100%",
      ".MuiTextField-root": {
        color: "white",
      },
      "& .MuiSvgIcon-root": {
        color: "rgba(0, 0, 0, 0.6)",
      },
      "& .MuiOutlinedInput-input": {
        color: "black",
      },
    },
  },
  loginContainer: {
    maxWidth: "100%",
    overflow: "hidden",
    position: "relative",
    "& .MuiGrid-container": {
      justifyContent: "center !important"
    },
  },

  loginFormStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeMessage: {
    color: "#373A4D",
    fontSize: "3rem",
    fontWeight: 600,
    margin: "20px 0px",
    textAlign: "center",
  },
  helloSign: {
    color: "#373A4D",
    fontSize: "50px",
    fontWeight: 400,
    margin: "20px 0px",
  },
  signUpWriting: {
    color: "#373A4D",
    fontSize: "16px",
    fontWeight: 400,
    margin: "20px 0px",
  },
  signUpSpanWriting: {
    color: "#373A4D",
    fontSize: "16px",
    fontWeight: 700,
    margin: "20px 0px",
    textDecoration: "underline",
  },
  loginButton: {
    background: theme.palette.primary,
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "none !important",
  },
}));
