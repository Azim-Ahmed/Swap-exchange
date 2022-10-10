import {
  Button,
  Grid,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SignBanner from "../../Components/Reusable/SignBanner";
import { HookFormTextField, Loader, Modal } from "Components/Reusable";
import { images } from "assets";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { activationUserByAdmin } from "redux/actions";
import { Visibility, VisibilityOff } from "@material-ui/icons";
/**
 *@function Login.jsx
 *@author Azim
 *
 **/

const ResetPassword = (props) => {
  const classes = useStyles();
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const { userActivation, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchId = new URLSearchParams(search).get("secretKey");
  const renderPasswordReset = () => {
    return (
      <Modal
        open={passwordResetSuccess}
        handleClose={() => setPasswordResetSuccess(false)}
        title="A password reset link has been sent to your email. Please click on the link to recover your password.
        "
        image={images.userCreated}
      />
    );
  };
  //Hook form state
  const {
    formState: { errors },
    handleSubmit,
    control,
    // reset,
    setError,
  } = useForm({
    mode: "all",
  });
  //   const onSubmit = (data) => {
  //     dispatch(resetPassword(data));
  //     // success &&
  //     // setPasswordResetSuccess(true);
  //     reset();
  //   };
  const onSubmit = (data) => {
    if (data.newPassword === data.conPassword) {
      const { newPassword } = data;
      dispatch(activationUserByAdmin(searchId, newPassword));
      // handleClose()
      // reset();
    } else {
      setError("conPassword", {
        type: "validate",
        message: "Password doesn't matched",
      });
      setError("newPassword", {
        type: "validate",
        message: "Password doesn't matched",
      });
    }
  };
  //show password section
  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };
  return (
    <section className={classes.loginContainer}>
      {passwordResetSuccess && renderPasswordReset()}
      <Grid container>
        <SignBanner />
        <Grid className={classes.loginFormStyle} item md={6}>
          {loading ? (
            <Loader />
          ) : userActivation ? (
            <Box style={{ padding: "6rem", textAlign: "center" }}>
              <Box>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "2rem",
                    marginBottom: "10px",
                  }}
                >
                  Your account has <br /> activated successfully
                </Typography>
                <img src={images.userCreated} alt="" />
              </Box>
              <Link to="/login">
                <Button
                  style={{ marginTop: "2.5rem", padding: ".6rem 1.3rem" }}
                  color="primary"
                  variant="contained"
                >
                  Click to login
                </Button>
              </Link>
            </Box>
          ) : (
            <Box style={{ margin: "1rem" }}>
              <Typography
                className={classes.welcomeMessage}
                variant="h3"
                component="p"
              >
                Enter your password
              </Typography>
              <Box>
                <Typography
                  className={classes.secondaryText}
                  variant="h6"
                  component="p"
                >
                  Enter your password to activate your account.
                </Typography>
              </Box>
              <form
                className={classes.root}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <HookFormTextField
                  name={`newPassword`}
                  control={control}
                  errors={errors}
                  label={`New Password`}
                  type={values.showPassword ? "text" : "password"}
                  style={{  marginTop: "10px" }}
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
                <HookFormTextField
                  name={`conPassword`}
                  control={control}
                  errors={errors}
                  label={`New Password`}
                  type={values.showConfirmPassword ? "text" : "password"}
                  style={{  marginTop: "10px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowConfirmPassword}>
                          {values.showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
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
                    className={classes.recoveryButton}
                  >
                    Activate
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Grid>
      </Grid>
    </section>
  );
};

export default ResetPassword;

//Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      width: "100%",
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
    color: theme.palette.common.black,
    fontWeight: 700,
    fontSize: "34px",
    margin: "3rem 0rem 2rem 0rem",
    textAlign: "center",
  },
  secondaryText: {
    color: "#373A4D",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center",
    fontWeight: 400,
    marginBottom: "15px",
  },
  recoveryButton: {
    background: theme.palette.primary,
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "none !important",
  },
  textStyle: {
    marginBottom: "15px",
    minWidth: 457,
  },
}));
