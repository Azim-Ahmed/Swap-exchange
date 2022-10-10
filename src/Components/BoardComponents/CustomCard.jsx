import React from "react";
import { images } from "assets";
import SVGRender from "../Reusable/SVGRender";
import { format } from "date-fns";
import {
  Adb as AdbIcon,
  Star as StarIcon,
  DeleteOutline as DeleteOutlineIcon,
  AccountCircleSharp as AccountCircleSharpIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
  AttachFile as AttachFileIcon,
} from "@material-ui/icons";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { UserAvatar } from "Components/Reusable";
/**
 *@function CustomCard.jsx
 *@author Azim
 *
 **/
const NewCustomCard = (props) => {
  const {
    partData,
    handleDeleteCard,
    getAvatar,
    getName,
    getEpicColor,
    getEpicName,
    persona,
    logenable,
    setCardId,
  } = props;

  const classes = useStyles();


  const differDate = () => {
    const date1 = new Date();
    const date2 = new Date(partData.createDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }




  return (
    <>
      {partData?.type === "release" ?
        <div className={classes.releasecardstyle} >
          <div style={{ position: "relative" }}>
            <IconButton
              className={classes.deleteReleaseIconStyle}
              onClick={() => handleDeleteCard(partData)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>
          <div onClick={() => setCardId(partData?.id)}>
            <span style={{ color: "white", fontSize: "12px", textDecoration: "underline" }}>#{partData?.issueCode}</span>
            <h3 className={classes.releasename}>{partData?.releaseName}</h3>

          </div>
        </div> :
        <div style={{ position: "relative" }}>
          <IconButton
            className={classes.deleteIconStyle}
            onClick={() => handleDeleteCard(partData)}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <div
            onClick={() => setCardId(partData?.id)}
            className={classes.customCardStyle}
          >
            <div>
              <h1 className={classes.serialIdStyle}>#{partData?.issueCode}</h1>

              {partData?.bugsLabel ? <div className={classes.labelbox} style={differDate() < 7 ? { backgroundColor: "#00cc7a" } : differDate() < 15 ? { backgroundColor: "#ffff00" } : { backgroundColor: "#ff3333" }}></div> : null}
            </div>
            <div className={classes.flexBetween}>
              {partData?.title && (
                <h1 className={classes.cardHeader}>
                  {`As ${persona?.name}
               I want to do the ${partData?.title}
                process So that I can ${partData?.label}`}
                </h1>
              )}
              {partData?.bugsLabel && (
                <h1 className={classes.cardHeader}>{partData?.bugsLabel}</h1>
              )}
              {partData?.choresLabel && (
                <h1 className={classes.cardHeader}>{partData?.choresLabel}</h1>
              )}
            </div>
            <div className={classes.flexBetween}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {!logenable ? (
                  <>
                    {partData?.size === "0" && (
                      <SVGRender img={images.tShirt} alt={"small Icon"} />
                    )}
                    {partData?.size === "1" && (
                      <SVGRender img={images.smallIconForSize} alt={"small Icon"} />
                    )}
                    {partData?.size === "2" && (
                      <SVGRender
                        img={images.mediumIconForSize}
                        alt={"medium Icon"}
                      />
                    )}
                    {partData?.size === "3" && (
                      <SVGRender img={images.largeIconForSize} alt={"large Icon"} />
                    )}
                    {!partData?.size && (
                      <SVGRender img={images.tShirt} alt={"noSize Icon"} />
                    )}
                  </>
                ) : null}

                {partData?.type === "bug" && (
                  <AdbIcon
                    className={classes.typesIconStyle}
                    style={{ color: "red" }}
                  />
                )}
                {partData?.type === "feature" && (
                  <StarIcon
                    className={classes.typesIconStyle}
                    style={{ color: " #F0DD2E" }}
                  />
                )}

                {partData.type === "chore" && (
                  <AssignmentTurnedInOutlinedIcon
                    className={classes.typesIconStyle}
                  />
                )}

                {partData.attachmentList && partData.attachmentList.length > 0 && (
                  <AttachFileIcon className={classes.typesIconStyle} />
                )}
                {partData?.dueDate && (
                  <p className={classes.dueDateStyle}>
                    {format(new Date(partData.dueDate), "dd-MM-yyyy")}
                  </p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  {partData?.userId ? (
                    <UserAvatar
                      className={classes.typesIconStyle}
                      getAvatar={getAvatar}
                      getName={getName}
                      userId={partData?.userId}
                    />
                  ) : (
                    <Tooltip title={"Not Assigned"} arrow>
                      <AccountCircleSharpIcon
                        style={{ color: "#9A9A9A", height: "16px" }}
                      />
                    </Tooltip>
                  )}
                </div>
                {partData?.epicId && (
                  <p
                    style={{ background: getEpicColor(partData?.epicId) }}
                    className={classes.epicIdforCard}
                  >
                    {getEpicName(partData?.epicId)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>}
    </>

  );
};

export default React.memo(NewCustomCard);

const useStyles = makeStyles((theme) => ({
  deleteIconStyle: {
    position: "absolute",
    zIndex: "10",
    right: 0,
    top: 0,
    color: " #7478E8",
    height: "16px",
    width: "16px",
  },
  customCardStyle: {
    borderRadius: "3px",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#fff",
    position: "relative",
    padding: "4px",
    paddingBottom: "0",
    paddingRight: "0",
    cursor: "pointer",
    maxWidth: "250px",
    marginBottom: "7px",
    minWidth: "238px",
  },
  serialIdStyle: {
    color: "blue",
    fontWeight: "300",
    fontSize: "12px",
    textDecoration: "underline",
    marginTop: "0",
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  typesIconStyle: {
    height: "16px",
    width: "16px",
    fontSize: "9px",
    marginRight: "3px",
    marginBottom: "3px",
  },
  epicIdforCard: {
    borderRadius: "10px 0px 0px 0px",
    padding: "2px",
    margin: "0",
    textAlign: "center",
    whiteSpace: "nowrap",
    width: "80px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardHeader: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#000000",
    marginTop: "0",
  },
  dueDateStyle: {
    margin: 0,
    fontSize: "10px",
    weight: 400,
    color: " #999999",
  },
  labelbox: {
    borderRadius: "50px",
    height: "8px",
    width: "45px",
    marginBottom: ".2rem",
    // backgroundColor: "#00cc7a"
  },
  releasecardstyle: {
    padding: "0.2rem",
    backgroundColor: "#00cc7a",
    paddingBottom: ".5rem",
    margin: "0 0 .5rem 0",
    cursor: "pointer"
  },
  releasename: {
    paddingLeft: "31%",
    color: "white",
    fontWeight: "normal",
    fontSize: "18px",
    width:"155px"
  },

  deleteReleaseIconStyle: {
    position: "absolute",
    zIndex: "10",
    right: 0,
    top: 0,
    color: "white",
    height: "16px",
    width: "16px",
  },
}));
