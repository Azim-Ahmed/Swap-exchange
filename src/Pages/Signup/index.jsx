/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Grid,
  Card,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { images } from "assets";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resendActivationUser,
  signup,
  handleRemoveSuccessFromSignup,
} from "redux/actions";
// import { VoucherCode } from "assets/Data/VoucherCode";
import {
  CssTextField,
  Loader,
  ErrorMessages,
  SignBanner,
  Modal,
} from "Components/Reusable";
import Terms from "Components/UtilComponents/Terms";
import { redirectUrl } from "Utils";

const Signup = () => {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const { success, loading } = useSelector((state) => state.user);
  const [clock, setClock] = useState(null);
  const [useraname, setUserName] = useState({});
  // const [submitting, setsubmitting] = useState(undefined);
  const location = useLocation();
  const domHostname = window?.location?.host;
  const dispatch = useDispatch();
  //RHF
  const {
    control,
    formState: { errors },
    handleSubmit,
    // watch,
    reset,
    setError,
  } = useForm();
  // const voucher = watch("voucher");
  //async
  const onSubmit = (data) => {
    const { name, username, password, cpassword } = data;
    let newData = { name, password };
    newData.username = username.toLowerCase();
    newData.roleType = "ADMIN";
    newData.isAdmin = true;
    newData.avatar = "male1"
    // newData.voucherCode = voucher;
    newData.redirectUrl = redirectUrl(domHostname, "activation-link");
    if (password !== cpassword) {
      setError("cpassword", {
        type: "custom",
        message: `Confirm Password doesn't match`,
      });
    } else {
      dispatch(signup(newData));
      setClock(30);
      setUserName(newData);
      success && reset();
    }
  };

  //show password section
  const [values, setValues] = useState({
    showPassword: false,
    showCpassword: false,
  });

  const [openDialogueModal, setOpenDialogueModal] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCPassword = () => {
    setValues({ ...values, showCpassword: !values.showCpassword });
  };

  const renderTermsAndServicesModal = () => {
    return (
      <Modal
        open={openDialogueModal}
        handleClose={() => {
          setOpenDialogueModal(false);
        }}
        board
        maxWidth={"1157px"}
        style={{ overflow: "scroll" }}
      >
        <Terms />
      </Modal>
    );
  };

  // const voucherData = (value) => {
  //   const Voucher = VoucherCode.find((data) => data.name === value);
  //   if (Voucher) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  // useEffect(() => {
  //   if (voucher) {
  //     setsubmitting(VoucherCode.find((data) => data.name === voucher));
  //   }
  // }, [voucher]);
  if (auth.authenticate) {
    return <Redirect from={location.pathname} exact to={`/project`} />;
  }
  useEffect(() => {
    if (clock === 0) {
      setClock(null);
    }
    if (!clock) return;
    const intervalId = setInterval(() => {
      setClock(clock - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [clock]);

  // handling sending verification code to get it again
  const handleSendVerificationCode = () => {
    dispatch(resendActivationUser(useraname.username, useraname?.redirectUrl));
    setClock(60);
  };
  const handleRemoveSuccessFromSignupPage = () => {
    dispatch(handleRemoveSuccessFromSignup(false));
  };
  return (
    <section className={classes.loginContainer}>
      <Grid container>
        <SignBanner />
        <Grid className={classes.loginFormStyle} item md={6}>
          {loading ? (
            <Loader />
          ) : success ? (
            <Card>
              <Box style={{ padding: "6rem", textAlign: "center" }}>
                <Box>
                  <Typography style={{ fontWeight: "600", fontSize: "2rem" }}>
                    Voucher code <br /> redeemed successfully
                  </Typography>
                  <img src={images.userCreated} alt="" />
                </Box>
                <p>
                  {/* A link will be sent to your <strong>email address</strong> to
                  activate your subscription. if <br /> you don't get an email
                  within a few minutes click on the resend link <br /> button or{" "} */}
                  Your account already active , now you can login.
                  <Link
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "underline",
                    }}
                    onClick={handleRemoveSuccessFromSignupPage}
                    to="/login"
                  >
                    Go Back to Login
                  </Link>
                </p>
                {/* <p>
                  A link will be sent to your <strong>email address</strong> to
                  activate your subscription. if <br /> you don't get an email
                  within a few minutes click on the resend link <br /> button or{" "}
                  <Link
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "underline",
                    }}
                    onClick={handleRemoveSuccessFromSignupPage}
                    to="/login"
                  >
                    Go Back to Login
                  </Link>
                </p> */}
                <Button
                  style={{
                    marginTop: "3rem",
                    padding: ".5rem 3rem .5rem 3rem",
                  }}
                  color="primary"
                  variant="contained"
                  onClick={() => handleSendVerificationCode()}
                  disabled={clock ? true : false}
                >
                  {`Resend Link ${clock ? clock : ""}`}
                </Button>
              </Box>
            </Card>
          ) : (
            <Box maxWidth="428px" margin={"1rem"}>
              <Typography
                className={classes.welcomeMessage}
                variant="h4"
                component="h3"
              >
                Hi <span className={classes.helloSign}>👋</span>
              </Typography>
              <Typography className={classes.signUpWriting}>
                Thanks for taking an interest in SquareBear. Already have <br />{" "}
                an account?
                <Link to="/login">
                  <span className={classes.signUpSpanWriting}> Login now.</span>
                </Link>
              </Typography>

              {/* hoook form section */}
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    maxLength: {
                      value: 40,
                      message: "You can't put more than 40 characters",
                    },
                  }}
                  render={({ field }) => (
                    <CssTextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      type="text"
                    />
                  )}
                />
                <ErrorMessages errors={errors} name="name" />
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Entered value does not match email format",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <CssTextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                    />
                  )}
                />
                <ErrorMessages errors={errors} name="username" />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  }}
                  render={({ field }) => (
                    <CssTextField
                      variant="outlined"
                      {...field}
                      fullWidth
                      autoComplete={"true"}
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
                <ErrorMessages errors={errors} name="password" />
                <Controller
                  name="cpassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: "Confirm Password is required",
                    },
                  }}
                  render={({ field }) => (
                    <CssTextField
                      variant="outlined"
                      {...field}
                      fullWidth
                      autoComplete={"true"}
                      label="Confirm Password"
                      type={values.showCpassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowCPassword}>
                              {values.showCpassword ? (
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
                <ErrorMessages errors={errors} name="cpassword" />
                {/* <Controller
                  name="voucher"
                  control={control}
                  rules={{
                    required: true,
                    validate: voucherData,
                  }}
                  render={({ field }) => (
                    <CssTextField
                      {...field}
                      label="Voucher Code"
                      variant="outlined"
                      fullWidth
                      type="text"
                    />
                  )}
                /> */}
                <ErrorMessages errors={errors} name="voucher" />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.loginButton}
                  >
                    Signup
                  </Button>
                </Box>
                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {submitting ? (
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.loginButton}
                    >
                      Signup
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.loginButton}
                    >
                      Signup
                    </Button>
                  )}
                </Box> */}
                <Typography className={classes.signUpBottomText}>
                  By continuing you indicate that you've read and agree to our
                  &nbsp;
                  <br />
                  <span
                    onClick={() => setOpenDialogueModal(true)}
                    className={classes.linkStyle}
                  >
                    Terms of Service
                  </span>
                </Typography>
                {openDialogueModal && renderTermsAndServicesModal()}
              </form>
            </Box>
          )}
        </Grid>
      </Grid>
    </section>
  );
};

export default Signup;

//material Ui styles

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      ".MuiTextField-root": {
        color: "gray",
      },
      "& .MuiOutlinedInput-input": {
        color: "gray",
      },
    },
  },
  loginContainer: {
    maxWidth: "100%",
    overflow: "hidden",
    position: "relative",
    "& .MuiGrid-container": {
      justifyContent: "center !important",
    },
  },
  helloSign: {
    color: "#373A4D",
    fontSize: "50px",
    fontWeight: 400,
    margin: "20px 0px",
  },
  loginFormStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeMessage: {
    color: "black",
    fontSize: "3rem",
    fontWeight: 700,
    textAlign: "center",
    lineHeight: "51px",
    letter: "-2%",
  },
  signUpSpanWriting: {
    color: "#373A4D",
    fontSize: "16px",
    fontWeight: 700,
    margin: "20px 0px",
    textDecoration: "underline",
  },
  signUpBottomText: {
    marginTop: "10px",
    fontSize: "12px",
    fontWeight: "normal",
    color: " #6D787E",
    textAlign: "center",
  },
  loginButton: {
    marginTop: "10px",
  },
  linkStyle: {
    textDecoration: "underline",
    fontWeight: "700",
    fontSize: "12px",
    lineHeight: "18px",
    textAlign: "center",
    color: " #6D787E",
    cursor: "pointer",
  },
  signUpWriting: {
    color: "#373A4D",
    fontSize: "16px",
    fontWeight: 400,
    margin: "20px 0px",
  },
  background: theme.palette.primary,
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "none !important",
  marginTop: "10px",
}));
