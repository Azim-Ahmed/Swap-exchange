import { useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
import { MPopover, CustomSnacbar, QuillText } from "Components/Reusable";
import { Modal } from "Components/Reusable";

export const RPersona = (props) => {
  const classes = useStyles();
  const descriptionconvert =
    props.item && props.item.description !== ""
      ? JSON.parse(props.item.description)
      : null;
  const [editorUpdateState, setEditorUpdateState] = useState(
    descriptionconvert !== null ? descriptionconvert : ""
  );
  const [open, setOpen] = useState(false);
  const [personasShow, setpersonasShow] = useState(false);
  const [anchorElPersonas, setAnchorElPersonas] = useState(null);
  const [personaName, setPersonaName] = useState(props?.item?.name);
  const [deleteItems, setDeleteItems] = useState(false);
  const handleClose = () => {
    props.item.description = JSON.stringify(editorUpdateState) ?? [];
    props.getItemData(props.item);
    setOpen(false);
  };

  const handleChangeName = () => {
    props.item.name = personaName;
    props.getItemData(props.item);
  };

  const PopOverForPersonas = () => {
    return (
      <MPopover
        id={props.item.id}
        open={personasShow}
        anchorEl={anchorElPersonas}
        onClose={() => {
          setAnchorElPersonas(null);
          setpersonasShow(false);
          handleChangeName();
        }}
        className={classes.personasStyle}
      >
        <Box padding={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="name"
            value={personaName}
            onChange={(event) => setPersonaName(event.target.value)}
          />
        </Box>
      </MPopover>
    );
  };

  const DeleteItems = () => {
    return (
      <CustomSnacbar
        opened={deleteItems}
        DeleteText="Are you sure you want to delete this card?"
        undone
        delid={props?.item?.id}
        handleDeleteFromBackend={props.handleDelete}
        setOpenAlert={setDeleteItems}
        type="adminUser"
      />
    );
  };

  const renderUpdateNotes = () => {
    return (
      <div>
        <Grid
          style={{
            maxWidth: "770px",
            borderRadius: "8px",
            height: "155px",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <QuillText
            value={editorUpdateState}
            onChange={setEditorUpdateState}
          />
          {/* <Editor
            editorState={editorUpdateState}
            onEditorStateChange={onCommentDataUpdateChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "link",
                "image",
                "history",
              ],
            }}
          /> */}
        </Grid>
      </div>
    );
  };

  return (
    <Box
      className={classes.mainCard}
      style={{ backgroundColor: props?.item?.backColor }}
    >
      <Box
        className={classes.commentsCard}
        style={
          props?.menuOpen
            ? {
                width: "41vh",
                transition: ".5s",
                borderLeft: `5px solid ${props?.item?.sideColor}`,
              }
            : {
                width: "46.7vh",
                transition: ".5s",
                borderLeft: `5px solid ${props?.item?.sideColor}`,
              }
        }
      >
        <Box
          className={classes.insideitem}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <div
            onClick={(event) => {
              setpersonasShow(!personasShow);
              setAnchorElPersonas(event.currentTarget);
            }}
          >
            {props.item.name}{" "}
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => setDeleteItems(true)}
          >
            {" "}
            <Delete style={{ color: props?.item?.sideColor }} />{" "}
          </div>
        </Box>
        {deleteItems && DeleteItems()}
        {PopOverForPersonas()}
        {!open ? (
          <Box
            dangerouslySetInnerHTML={{
              __html: editorUpdateState,
            }}
            style={{
              paddingLeft: "1rem",
              width: "20px !important",
              height: "184px",
              overflow: "hidden",
              overflowY: "scroll",
            }}
            className={classes.editorbox}
            onClick={() => setOpen(true)}
          ></Box>
        ) : null}

        <Modal open={open} board handleClose={handleClose}>
          <div style={{ padding: "10px" }}>{renderUpdateNotes()}</div>
        </Modal>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  mainCard: {
    height: "248px",
  },
  commentsCard: {
    margin: ".5rem",
    height: "235px",
  },
  insideitem: {
    fontWeight: "bold",
    marginLeft: "1rem",
    paddingTop: "0.7rem",
  },
  forGetText: {
    position: "relative",
    // top: "-111px",
    // backgroundColor: "black",
    height: "119px",
  },
  personasStyle: {
    marginLeft: "65px !important",
  },
  editorbox: {
    "&::-webkit-scrollbar": {
      width: "0",
    },
  },
}));
