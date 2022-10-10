import { Box } from "@material-ui/core";

/**
 *@function NotFound.jsx
 *@author Azim
 *
 **/

const NotFound = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      style={{
        color: "red",
      }}
    >
      <h1>This. NotFound Component</h1>
    </Box>
  );
};

export default NotFound;
