import React from "react";
import { images } from "assets";
import SVGRender from "../Reusable/SVGRender";
import {
  DeleteOutline as DeleteOutlineIcon,
  AttachFile as AttachFileIcon,
} from "@material-ui/icons";
import WarningIcon from "@material-ui/icons/Warning";
import { IconButton, makeStyles } from "@material-ui/core";
import { riskAndIssuesData } from "assets/Data/RiskAndIssue";
/**
 *@function CustomCard.jsx
 *@author Azim
 *
 **/
const CustomCardForRisk = (props) => {
  const { partData, handleDeleteCard, setCardId, journeyMap } = props;

  const renderStyle = {
    height: "16px",
    width: "16px",
    margin: "0px 4px 2px -2px",
  };
  const classes = useStyles();
  return (
    <div style={{ position: "relative" }}>
      {journeyMap ? (
        <div
          onClick={() => setCardId(partData?.id)}
          className={`${classes.customCardStyle} ${classes.cardStyle}`}
        >
          {partData?.title && (
            <h1 className={classes.cardHeader}>{partData?.title}</h1>
          )}
        </div>
      ) : (
        <>
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
              <h1 className={classes.serialIdStyle}>
                #-Risk-{partData?.serialNumber}
                {partData?.issueCode}
              </h1>
            </div>
            <div className={classes.flexBetween}>
              {partData?.title && (
                <h1 className={classes.cardHeader}>{partData?.title}</h1>
              )}
            </div>
            <div className={classes.flexBetween}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {partData?.type === "risk" && (
                  <WarningIcon
                    style={{
                      color: " #FFDD15",
                      stroke: "black",
                      height: "16px",
                      ...renderStyle,
                    }}
                    color="warning"
                  />
                )}
                {partData?.type === "issue" && (
                  <SVGRender
                    style={renderStyle}
                    img={images.risk_}
                    alt={"small Icon"}
                  />
                )}
                {partData.attachmentList &&
                  partData.attachmentList.length > 0 && (
                    <AttachFileIcon className={classes.typesIconStyle} />
                  )}
                {partData?.assessments && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: riskAndIssuesData.getColors(
                        JSON.parse(partData?.assessments)
                      )?.color,
                    }}
                  ></div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(CustomCardForRisk);

const useStyles = makeStyles(() => ({
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
  cardStyle: {
    minHeight: "75px",
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
    alignItems: "center",
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
}));
