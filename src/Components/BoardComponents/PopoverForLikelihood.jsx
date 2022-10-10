import { Box, MenuItem } from "@material-ui/core";
import { MPopover } from "..";

/**
 *@function PopoverForLikelihood.jsx
 *@author Azim
 *
 **/

const PopoverForLikelihood = ({
  openLikeLihood,
  anchorLikelihoodChange,
  setAnchorLikelihoodChange,
  className,
  currentLikeliHood,
  handleUpdateAssesmentLikelyHood,
}) => {
  return (
    <Box>
      <MPopover
        id={"simple-popover"}
        open={openLikeLihood}
        anchorEl={anchorLikelihoodChange}
        onClose={() => setAnchorLikelihoodChange(null)}
        className={className}
      >
        {currentLikeliHood.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleUpdateAssesmentLikelyHood(item)}
            style={{ color: item.color, textDecoration: "underline" }}
          >
            {item.title}
          </MenuItem>
        ))}
      </MPopover>
    </Box>
  );
};

export default PopoverForLikelihood;
