import { Button } from "@material-ui/core";

/**
 *@function CloseButton.jsx
 *@author Azim
 *
 **/

const CloseButton = ({ handleCloseModal, classes }) => {
  return (
    <Button
      className={classes.submitAndCloseButton}
      style={{
        marginRight: "10px",
        background: "#F5F5F5",
      }}
      onClick={handleCloseModal}
      variant="outlined"
      type="button"
      color="secondary"
    >
      Close
    </Button>
  );
};

export default CloseButton;
