import { Popper } from "@material-ui/core";

/**
 *@function MPopover.jsx
 *@author Shahed
 *
 **/

const CustomPopper = ({ open, anchorEl, className, children }) => {
    return (
        <Popper
            open={open}
            className={className}
            anchorEl={anchorEl}
            placement="right"
            disablePortal={false}
        >
            {children}
        </Popper>

    )
}


export default CustomPopper