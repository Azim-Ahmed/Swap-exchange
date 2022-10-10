import React, { useState } from "react";
import {
  Clear as ClearIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  addNewLaneForKanban,
  deleteCustomLaneForKanban,
  deleteCustomRiskLaneForKanban,
  updateLaneForKanban,
  addNewLaneForRiskAndIssueKanban,
  updateRiskAndIssueLaneForKanban,
} from "redux/actions";
import {
  CustomSnacbar,
  Modal,
  MPopover,
  RIconButton,
} from "Components/Reusable";
import store from "redux/store";
import { HookFormTextField } from "Components/Reusable";

function CustomLaneHeader({ props, kanbanData, kanbanId, riskAndIssue }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [beforeDeleteAlert, setBeforeDeleteAlert] = useState(false);
  const [openToUpdate, setOpenToUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const boardState =
    props.title === "Ice Box" ||
    props.title === "To Do" ||
    props.title === "Doing" ||
    props.title === "Done" ||
    props.title === "Accepted";
  //Hook form state
  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setError,
  } = useForm({
    mode: "all",
  });
  const checkingNotInputValue = [
    "Ice Box",
    "To Do",
    "To do",
    "Doing",
    "Done",
    "Accepted",
    "ice box",
    "ice Box",
    "Ice box",
    "to Do",
    "done",
    "accepted",
    "doing",
  ];
  const {
    formState: { errors: errorsUpdate },
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    control: controlUpdate,
    setError: setErrorUpdate,
  } = useForm({
    mode: "all",
    defaultValues: {
      title: props.title,
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSubmit = (data) => {
    const similarValues = checkingNotInputValue.find(
      (item) => item === data.label
    );
    if (similarValues && props.defaultKanban) {
      setError("label", {
        type: "validate",
        message: "This column name already predefined",
      });
      return;
    }
    const newLaneData = { ...data };
    newLaneData.title = data.label;
    newLaneData.projectId = props.projectId;
    newLaneData.notDeletable = false;
    if (!riskAndIssue) {
      newLaneData.kanbanId = props.kanbanId;
    }
    newLaneData.defaultKanban = props.defaultKanban;
    newLaneData.cards = [];
    newLaneData.serial = kanbanData.length + 1;
    !riskAndIssue &&
      store.dispatch(
        addNewLaneForKanban(props.projectId, newLaneData, kanbanId)
      );
    riskAndIssue &&
      store.dispatch(
        addNewLaneForRiskAndIssueKanban(props.projectId, newLaneData)
      );
    setModalOpen(false);
    handleClose();
    reset();
  };
  const onUpdateSubmit = (data) => {
    const similarValues = checkingNotInputValue.find(
      (item) => item === data.label
    );
    if (similarValues && props.defaultKanban) {
      setErrorUpdate("label", {
        type: "validate",
        message: "This column name already predefined",
      });
      return;
    }
    const updateLaneData = { ...data };
    updateLaneData.title = data.label;
    updateLaneData.projectId = props.projectId;
    updateLaneData.cards = props.cards;
    updateLaneData.notDeletable = props.notDeletable;
    if (!riskAndIssue) {
      updateLaneData.kanbanId = props.kanbanId;
    }
    updateLaneData.defaultKanban = props.defaultKanban;
    updateLaneData.id = props.id;
    !riskAndIssue &&
      store.dispatch(
        updateLaneForKanban(props.projectId, updateLaneData, props.id, kanbanId)
      );

    riskAndIssue &&
      store.dispatch(
        updateRiskAndIssueLaneForKanban(
          props.projectId,
          updateLaneData,
          props.id
        )
      );
    setOpenToUpdate(false);
    handleClose();
    resetUpdate();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteClick = () => {
    if (!boardState && props?.cards.length > 0) {
      setBeforeDeleteAlert(true);
    } else {
      setOpenAlert(true);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles();
  const handleDeleteFromBackend = (id) => {
    !riskAndIssue &&
      store.dispatch(
        deleteCustomLaneForKanban(props?.projectId, props?.id, kanbanId)
      );
    riskAndIssue &&
      store.dispatch(
        deleteCustomRiskLaneForKanban(props?.projectId, props?.id)
      );
    setOpenAlert(false);
  };
  const renderModalForAddingNewColumn = () => {
    return (
      <Modal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          handleClose();
          reset();
        }}
      >
        <div style={{ padding: "30px" }}>
          <Typography
            style={{ marginBottom: "20px" }}
            variant="h4"
            component="h1"
            align="left"
          >
            Add column
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <Box
              minWidth="505px"
              justifyContent="center"
              flexDirection="column"
              display="flex"
              alignItems="center"
            >
              <HookFormTextField
                name="label"
                control={control}
                errors={errors}
                rules={{
                  maxLength: {
                    value: 18,
                    message: "Not more than 18",
                  },
                  required: {
                    value: true,
                    message: "This is required",
                  },
                }}
                label="Column's label *"
                className={classes.textStyle}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "7px" }}
              >
                Add
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    );
  };

  const renderModalForUpdatingColumn = () => {
    return (
      <Modal
        open={openToUpdate}
        handleClose={() => {
          setOpenToUpdate(false);
          resetUpdate();
        }}
      >
        <Box p="30px">
          <Box mb="22px">
            <Typography variant="h4" component="h1" align="left">
              Update column
            </Typography>
          </Box>
          <form onSubmit={handleUpdateSubmit(onUpdateSubmit)} action="">
            <Box
              minWidth="505px"
              justifyContent="center"
              flexDirection="column"
              display="flex"
              alignItems="center"
            >
              <HookFormTextField
                defaultValue={props.title}
                name="label"
                errors={errorsUpdate}
                control={controlUpdate}
                rules={{
                  maxLength: {
                    value: 18,
                    message: "Not more than 18",
                  },
                  required: {
                    value: true,
                    message: "This is required",
                  },
                }}
                label="Column's label *"
                className={classes.textStyle}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "7px" }}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    );
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box>
          <Tooltip
            title={!boardState ? "Click to Update" : ""}
            placement="right"
            arrow
          >
            <div
              style={
                props.defaultKanban && boardState
                  ? { cursor: "text" }
                  : { cursor: "pointer" }
              }
              className={classes.newStyle}
              onClick={() => {
                !(props.defaultKanban && boardState) && setOpenToUpdate(true);
              }}
            >
              {props && props.title}
            </div>
          </Tooltip>
          <MPopover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            id={id}
          >
            <Typography className={classes.typography}>
              <Button
                onClick={() => setModalOpen(true)}
                startIcon={<AddIcon />}
              >
                Add column
              </Button>
            </Typography>
          </MPopover>
        </Box>
        <div>
          <RIconButton
            title={"click to add new column"}
            placement="top"
            onClick={handleClick}
            type="button"
            id={id}
          >
            <MoreVertIcon />
          </RIconButton>

          {(props.defaultKanban && boardState) || props?.notDeletable ? (
            ""
          ) : (
            <RIconButton
              title={"click to remove lane"}
              placement="top"
              onClick={() => handleDeleteClick(props)}
            >
              <ClearIcon />
            </RIconButton>
          )}
        </div>
      </Box>
      {modalOpen && renderModalForAddingNewColumn()}
      {openToUpdate && renderModalForUpdatingColumn()}
      {openAlert && (
        <CustomSnacbar
          opened={openAlert}
          handleDeleteFromBackend={handleDeleteFromBackend}
          setOpenAlert={setOpenAlert}
          type="Lane"
        />
      )}
      {beforeDeleteAlert && (
        <CustomSnacbar
          opened={beforeDeleteAlert}
          setOpenAlert={setBeforeDeleteAlert}
          DeleteText="You have to delete or drag all cards from this lane"
        />
      )}
    </div>
  );
}
export default React.memo(CustomLaneHeader);

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  newStyle: {
    float: "left",
    width: "auto",
    height: "auto",
    margin: "5px 0px 2px 0",
    fontSize: "20px",
    fontWeight: "700",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0px",
    textAlign: "left",
    color: "#1b1d21",
  },
  textStyle: {
    marginBottom: "15px",
  },
}));
