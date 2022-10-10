import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  deleteFileFromBackend,
  downloadFileFromBackend,
  previewfilefrombackend,
} from "redux/actions";
import { makeStyles } from "@material-ui/styles";
import { nanoid } from "nanoid";
import columns from "./Columns";
import fileDownload from "js-file-download";
import { kanbanConstant } from "redux/actions/constant";
import { Close } from "@material-ui/icons";


/**
 *@function Attachments.jsx
 *@author Azim
 *
 **/

export default function Attachments({
  projectId,
  AttachmentList,
  updateFilesToSave,
  setUpdateFilesToSave,
  cardId,
  organizationId,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [updateAttachmentList, setUpdateAttachmentList] =
    useState(AttachmentList);
  const { imagepreview } = useSelector((state) => state.kanban);
  // convert array to th object
  const mapedWithDate = updateAttachmentList.map((item) => {
    const newItem = { ...item };
    const createdDate = newItem?.createDate;
    const createDated = format(new Date(createdDate), "dd-MM-yyyy");
    newItem.createDate = createDated;
    return newItem;
  });

  //making generated structured for the holding state data
  const holdingStateFiles = [...new Set(updateFilesToSave)];
  const createdStructured = holdingStateFiles.map((item) => {
    const { name, path } = item;
    const createdDate = format(new Date(), "dd-MM-yyyy");
    const returnedItem = {};
    returnedItem.name = name;
    returnedItem.autoGeneratedFileName = name;
    returnedItem.cardId = cardId;
    returnedItem.organizationId = organizationId;
    returnedItem.path = path;
    returnedItem.projectId = projectId;
    returnedItem.mainFile = item;
    returnedItem.createDate = createdDate;
    returnedItem.id = `structured__${nanoid(5)}`;
    return returnedItem;
  });
  const updatedStructuredAndGeneratedFiles = [
    ...createdStructured,
    ...mapedWithDate,
  ];
  // print object
  //download one document items
  const handleDownloadFileFromCard = (documentId, filename) => {
    dispatch(downloadFileFromBackend(projectId, documentId, filename));
  };

  //download one document items
  const handlePreviewFileFromBackend = (documentId, filename) => {
    dispatch(previewfilefrombackend(projectId, documentId, filename));
    document.getElementById("overlay").style.display = "block";
  };
  //download one document items
  const handleDownloadFileFromState = (documentId) => {
    const mainFile = createdStructured.find(
      (item) => item.id === documentId && item.mainFile
    );
    fileDownload(mainFile.mainFile, mainFile.name);
  };
  const handlePreviewFileFromState = (documentId) => {
    const mainFile = createdStructured.find(
      (item) => item.id === documentId && item.mainFile
    );
    dispatch({ type: kanbanConstant.IMAGE_PREVIEW, payload: mainFile });
  };
  //delete method to delete the document items
  const handleDeleteFileFromCard = (documentId) => {
    dispatch(deleteFileFromBackend(projectId, documentId));
    setUpdateAttachmentList(
      updateAttachmentList.filter((item) => item.id !== documentId)
    );
  };

  //handle Delete From File Holding State
  // const handleDeleteFileFromHoldingState = (documentId) => {
  //   const updatedFiles = createdStructured.filter(
  //     (item) => item.id !== documentId && item.mainFile
  //   );
  //   setUpdateFilesToSave(updatedFiles);
  // };

  //handle Delete From File Holding State
  const handleDeleteFileFromHoldingState = (documentId) => {
    const updatedFiles = createdStructured.filter(
      (item) => item.id !== documentId
    );
    setUpdateFilesToSave(updatedFiles.map((item) => item.mainFile));
  };
  //final row for the data grid
  const newSetRow = [...new Set(updatedStructuredAndGeneratedFiles)];

  const offmodal = () => {
    document.getElementById("overlay").style.display = "none";
    dispatch(previewfilefrombackend(projectId, null, null));
  };

  return (
    <div className={classes.rootOfProcessNode}>
      <div
        id="overlay"
        className={classes.overlay}
        style={{
          position: "fixed",
          display: "none",
          width: "100 %",
          height: "100 %",
          top: "0%",
          left: "0%",
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000000000000,
          cursor: "pointer",
        }}
        onClick={() => offmodal()}
      >
        <div
          style={{
            color: "black",
            borderRadius: "34px",
            width: "55px",
            height: "55px",
            padding: "1rem",
            backgroundColor: "white",
          }}
        >
          <Close style={{ fontSize: "26px" }} />
        </div>
        <div>
          <img
            src={imagepreview?.path ? imagepreview.path : imagepreview}
            alt=""
            style={{
              marginTop: "5rem",
              backgroundColor: "white",
              padding: ".2rem",
            }}
          />
        </div>
      </div>
      {updatedStructuredAndGeneratedFiles.length > 0 && (
        <DataGrid
          rows={newSetRow}
          columns={columns}
          autoHeight={true}
          disableSelectionOnClick
          rowsPerPageOptions={[5]}
          disableColumnMenu
          // hideFooter={true}
          pageSize={5}
          onCellClick={(row) => {
            const newDecisionLineEdge = row?.row.id.match(/structured__/g);
            if (row.id && row.field === "Delete") {
              if (newDecisionLineEdge) {
                handleDeleteFileFromHoldingState(row?.row.id);
              } else {
                handleDeleteFileFromCard(row?.row.id);
              }
            }
            if (row.id && row.field === "Download") {
              if (newDecisionLineEdge) {
                handleDownloadFileFromState(row?.row.id, row?.row.name);
              } else {
                handleDownloadFileFromCard(row?.row.id, row?.row.name);
              }
            }
            if (row.id && row.field === "Preview") {
              if (newDecisionLineEdge) {
                handlePreviewFileFromState(row?.row.id, row?.row.name);
              } else {
                handlePreviewFileFromBackend(row?.row.id, row?.row.name);
              }
            }
          }}
        />
      )}
    </div>
  );
}
const useStyles = makeStyles({
  rootOfProcessNode: {
    width: "100%",
    "& .MuiDataGrid-row": {
      "& .MuiDataGrid-cell--withRenderer": {
        justifyContent: "center",
        textAlign: "center !important",
      },
    },
  },
});