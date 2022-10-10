import { Button } from "@material-ui/core";

/**
 *@function SubmitButton.jsx
 *@author Azim
 *
 **/

const SubmitButton = ({ classes, handleSubmitUpdatedData }) => {
  return (
    <Button
      className={classes.submitAndCloseButton}
      color="primary"
      variant="contained"
      onClick={handleSubmitUpdatedData}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
