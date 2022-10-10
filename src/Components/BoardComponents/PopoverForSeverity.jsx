import { Box, MenuItem } from "@material-ui/core";
import { riskAndIssuesData } from "assets/Data/RiskAndIssue";
import { MPopover } from "..";

/**
 *@function PopoverForSeverity.jsx
 *@author Azim
 *
 **/

const PopoverForSeverity = ({
  openSeverity,
  anchorSeverityChange,
  setAnchorSeverityChange,
  className,
  handleUpdateAssesmentSeverity,
}) => {
  return (
    <Box>
      <MPopover
        id={"simple-popover"}
        open={openSeverity}
        anchorEl={anchorSeverityChange}
        onClose={() => setAnchorSeverityChange(null)}
        className={className}
      >
        {riskAndIssuesData?.severityTable.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleUpdateAssesmentSeverity(item)}
            style={{ color: item?.color, textDecoration: "underline" }}
          >
            {item.title}
          </MenuItem>
        ))}
      </MPopover>
    </Box>
  );
};

export default PopoverForSeverity;
