import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal as ReUseModal, Box } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const TableModal = (props) => {
  const classes = useStyles();
  return (
    <div>
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
            {props.children}
          </Box>
        </Fade>
      </ReUseModal>
    </div>
  );
};
export default TableModal;

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
    minHeight: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "6px",
    position: "relative",
    padding: theme.spacing(2, 4, 3),
    "&:focus-visible": {
      outline: "none",
    },
  },
  buttonOfClose: {
    position: "absolute",
    zIndex: "111",
    left: "87%",
    top: "7%",
    cursor: "pointer",
    color: "white",
  },
}));
