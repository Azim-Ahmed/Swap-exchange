import { Box, Button, Tooltip } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
/**
 *@function ReleaseButton.jsx
 *@author Shahed
 *
 **/

const ReleaseButton = ({ onClick }) => {
    return (
        <Box
            mt="10px"
            maxWidth={250}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Tooltip title="Click to add new release card" arrow>
                <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={onClick}
                >
                    Add Release
                </Button>
            </Tooltip>
        </Box>
    );
};

export default ReleaseButton;
