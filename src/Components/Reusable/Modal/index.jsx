import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal as ReUseModal,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Modal = (props, ref) => {
  //material Ui
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0,0,0,.5)",
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: "6px",
      position: "relative",
      display: props.userSIgnUp && "flex",
      justifyContent: props.userSIgnUp && "center",
      overflowY: props.board && "scroll",
      maxHeight: props.board && "650px",
      minHeight: props.splash ? "420px" : "300px",
      minWidth: props.splash ? "622px" : "622px",
      maxWidth: props.maxWidth ? props.maxWidth : "100%",

      padding: theme.spacing(2, 4, 3),
      "&:focus-visible": {
        outline: "none",
      },
    },
    buttonOfClose: {
      position: "absolute",
      zIndex: "111",
      left: "87%",
      top: "1",
      cursor: "pointer",
    },
    InputFiled: {
      marginTop: "30px",
      marginBottom: "10px",
    },
  }));
  const classes = useStyles();
  return (
    <div ref={ref}>
      <ReUseModal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={props.open}>
          <Box align="center" className={classes.paper}>
            {props.image && (
              <img
                style={{ height: "200px", width: "359px" }}
                src={props.image}
                alt={props.alt?.alt}
              />
            )}

            {props.title && (
              <Typography
                align="center"
                id="simple-modal-title"
                component="h5"
                variant="h5"
                style={{ fontWeight: "400" }}
              >
                {props.title}{" "}
                <span style={{ fontWeight: "700" }}>{props?.name}</span>
              </Typography>
            )}
            {props.name && (
              <Typography
                style={{ fontSize: "16px", fontWeight: "400" }}
                align="center"
              >
                {`Let’s get started by creating a project`}
              </Typography>
            )}

            {props.description && (
              <p id="simple-modal-description">{props.description}</p>
            )}
            {props.children}
            <br />
            <Link to={`${props.link}`} style={{ textDecoration: "none" }}>
              {props.link && (
                <Button
                  style={{ padding: "6px 30px", marginTop: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  LET'S GO
                </Button>
              )}
            </Link>
          </Box>
        </Fade>
      </ReUseModal>
    </div>
  );
};
const newModal = React.forwardRef(Modal);
export default newModal;
