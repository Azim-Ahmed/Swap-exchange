import { Box, Button, Tooltip } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
/**
 *@function AddButton.jsx
 *@author Azim
 *
 **/

const AddButton = (props) => {
  return (
    <Box
      mt="10px"
      maxWidth={250}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Tooltip title="Click to add new card" arrow>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={props.onClick}
        >
          Add new
        </Button>
      </Tooltip>
    </Box>
  );
};

export default AddButton;
