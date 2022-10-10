import React from "react";
import { UserAvatar } from "Components/Reusable";
import { Box, Button, makeStyles } from "@material-ui/core";
import draftToHtml from "draftjs-to-html";
import { format } from "date-fns";
const ShowNotes = ({
  savedDescription,
  getAvatar,
  getName,
  setUpdatenotes,
  setUpdateToNotes,
  SetSavedDescription,
}) => {
  const renderNotes = () => {
    return (
      <div>
        {savedDescription.map((item, index) => (
          <div style={{ borderBottom: "1px solid gray" }} key={index}>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <UserAvatar
                className={classes.updateCardAvatar}
                getAvatar={getAvatar}
                getName={getName}
                userId={item?.userId}
              />
              <p
                style={{
                  marginLeft: "8px",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                {getName(item.userId)}
              </p>
              <p style={{ marginLeft: "8px", fontSize: "12px" }}>
                {format(
                  new Date(item.cretedDate),
                  "MMMM dd, yyyy, hh:mm:ss aaaaa'm'"
                )}
              </p>
            </Box>
            <div
              dangerouslySetInnerHTML={{
                __html: draftToHtml(item?.comment),
              }}
              style={{ maxWidth: "750px", textAlign: "left" }}
            ></div>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              className={classes.shortIconForNotes}
            >
              <Button
                onClick={() => {
                  setUpdatenotes(true);
                  setUpdateToNotes(item);
                }}
                variant
              >
                Edit
              </Button>
              <Button
                onClick={() =>
                  SetSavedDescription(
                    savedDescription.filter((items) => items.id !== item.id)
                  )
                }
              >
                Delete
              </Button>
            </Box>
          </div>
        ))}
      </div>
    );
  };
  const classes = useStyles();
  return <Box>{renderNotes()}</Box>;
};
export default ShowNotes;

const useStyles = makeStyles(() => ({
  updateCardAvatar: {
    height: "24px",
    width: "24px",
    fontSize: "13px",
  },
  shortIconForNotes: {
    "& .MuiButton-root": {
      height: "19px",
      minWidth: "19px",
      marginRight: "7px",
      padding: 0,
      paddingTop: "4px",
      paddingBottom: "4px",
    },
  },
}));
