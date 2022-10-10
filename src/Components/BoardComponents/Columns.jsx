import { FormControlLabel, makeStyles } from "@material-ui/core";
import {
  DeleteOutline as DeleteOutlineIcon,
  CloudDownloadOutlined as CloudDownloadOutlinedIcon,
  Visibility,
} from "@material-ui/icons";
import { RIconButton } from "..";

const MatDelete = () => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      control={
        <RIconButton
          title="Delete this file"
          placement="top"
          className={classes.addButton}
          color="secondary"
          aria-label="add an alarm"
        >
          <DeleteOutlineIcon />
        </RIconButton>
      }
    />
  );
};
const MatDownload = () => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <RIconButton
          title="Download this file"
          placement="top"
          color="secondary"
          aria-label="add an alarm"
          className={classes.addButton}
        >
          <CloudDownloadOutlinedIcon />
        </RIconButton>
      }
    />
  );
};
const MatVisible = () => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <RIconButton
          title="preview this file"
          placement="top"
          color="secondary"
          aria-label="add an alarm"
          className={classes.addButton}
        >
          <Visibility />
        </RIconButton>
      }
    />
  );
};

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 240,
    sortable: false,
    description: "Name",
    editable: false,
  },
  {
    field: "createDate",
    headerName: "Date Added",
    minWidth: 150,
    editable: false,
    description: "Date Added",
    sortable: false,
  },

  {
    field: "Delete",
    headerName: "Delete",
    sortable: false,
    minWidth: 100,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MatDelete index={params.row.id} />
        </div>
      );
    },
  },
  {
    field: "Download",
    headerName: "Download",
    sortable: false,
    minWidth: 100,
    renderCell: (params) => {
      return (
        <div>
          <MatDownload index={params.row.id} />
        </div>
      );
    },
  },
  {
    field: "Preview",
    headerName: "Preview",
    sortable: false,
    minWidth: 100,
    renderCell: (params) => {
      return (
        <div>
          <MatVisible index={params.row.id} />
        </div>
      );
    },
  },
];

export default columns;

const useStyles = makeStyles((theme) => ({
  addButton: {
    cursor: "pointer",
    marginLeft: "10px",
    "& .MuiSvgIcon-root": {
      color: "#999999",
    },
  },
}));
