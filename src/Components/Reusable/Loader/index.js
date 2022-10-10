import { Box, CircularProgress } from '@material-ui/core';

/**
 *@function Loader.jsx
 *@author Azim
 *
 **/

const Loader = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className='loaderStyle'
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;