import { Box, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MPopover, UserAvatar } from "Components/Reusable";

/**
 *@function PopoverForNewAssignee.jsx
 *@author Azim
 *
 **/

const PopoverForNewAssignee = ({
  openAssigneeid,
  openAssignee,
  anchorForAssignee,
  setAnchorForAssignee,
  classes,
  toUsers,
  addCardsToIceBoxInTheBoard,
  singleAssigneeForBoard,
  setAddCardsToIceBoxInTheBoard,
  getAvatar,
  getName,
}) => {
  return (
    <Box>
      <MPopover
        id={openAssigneeid}
        open={openAssignee}
        anchorEl={anchorForAssignee}
        onClose={() => setAnchorForAssignee(null)}
        className={classes.popoverStyle}
      >
        <Autocomplete
          options={toUsers}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => {
            return option.value === value.value;
          }}
          style={{ width: "100%", padding: "20px" }}
          id="blur-on-select"
          blurOnSelect
          onChange={(e, f) => {
            const getData = addCardsToIceBoxInTheBoard.find(
              (item) => item.id === singleAssigneeForBoard.id
            );
            getData.userId = f?.value;
            const PopoverForNewAssigneeedEvidence =
              addCardsToIceBoxInTheBoard.find((info) => info.id === getData.id);
            addCardsToIceBoxInTheBoard[PopoverForNewAssigneeedEvidence] =
              getData;
            setAddCardsToIceBoxInTheBoard(addCardsToIceBoxInTheBoard);
            setAnchorForAssignee(null);
          }}
          defaultValue={
            toUsers.find(
              (item) => item?.value === singleAssigneeForBoard?.userId
            )
              ? toUsers.find(
                  (item) => item?.value === singleAssigneeForBoard?.userId
                )
              : ""
          }
          renderOption={(option, { selected }) => (
            <Box className={classes.flexBetweenCenter}>
              <UserAvatar
                className={classes.typesIconStyle}
                getAvatar={getAvatar}
                getName={getName}
                userId={option?.value}
              />
              <p
                style={{
                  color: "black",
                  display: "block",
                  marginLeft: "10px",
                }}
              >
                {option?.label}
              </p>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Assignee"
              variant="outlined"
            />
          )}
        />
      </MPopover>
    </Box>
  );
};

export default PopoverForNewAssignee;
