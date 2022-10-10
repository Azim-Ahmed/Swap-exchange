import { Button, Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "redux/actions";
import { HookFormTextField } from "Components/Reusable";
import { redirectUrl } from "Utils";

const UserSignup = (props) => {
  const classes = useStyles();
  //MODAL___SUCCESS__IF__USER__CREATED

  //REDUX__START
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { organizationId, projectId } = auth.user;
  const domHostname = window?.location?.host;
  //REACT__HOOK__FORM
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });
  //SUBMITTING__DATA
  const onSubmit = async (data) => {
    const { name, username } = data;
    let newData = { name, username };
    newData.roleType = "USER";
    newData.password = "Password123@";
    newData.organizationId = organizationId;
    newData.redirectUrl = redirectUrl(domHostname, "user-activation");
    newData.projectId = projectId;
    newData.isAdmin = false;
    dispatch(signup(newData));
    reset();
    props.handleClose();
  };

  //show password section
  return (
    <section className={classes.loginContainer}>
      <Grid container>
        <Grid className={classes.loginFormStyle} item>
          <Box>
            <Typography
              className={classes.welcomeMessage}
              variant="h6"
              component="h5"
            >
              Add User
            </Typography>
            {/* hoook form section */}
            <form
              className={classes.root}
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <HookFormTextField
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This is required",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must be 30 characters",
                  },
                }}
                errors={errors}
                label="Name"
                style={{ margin: "8px 0px" }}
              />
              <HookFormTextField
                name="username"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Entered value does not match email format",
                  },
                }}
                errors={errors}
                label="Email"
                type="email"
                style={{ margin: "8px 0px" }}
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
                  fullWidth
                  color="primary"
                  style={{ display: "inline-block", marginTop: "20px" }}
                >
                  Add user
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

export default UserSignup;

//material Ui styles

const useStyles = makeStyles(() => ({
  root: {
    minWidth: "500px",
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
    padding: "20px",
  },
  loginFormStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "500px",
  },
  welcomeMessage: {
    color: "black",
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "10px",
    marginTop: "-10px",
    textAlign: "left",
  },
}));
