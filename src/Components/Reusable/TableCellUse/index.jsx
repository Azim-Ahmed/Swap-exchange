import { TableCell } from "@material-ui/core";

/**
 *@function TableCellUse.jsx
 *@author Azim
 *
 **/

const TableCellUse = ({
  width,
  align,
  style,
  name,
  head,
  component,
  scope,
  maxWidth,
}) => {
  const styled = head && { fontWeight: "600", maxWidth: maxWidth };
  return (
    <TableCell
      style={
        style ? { ...style, fontSize: "11px" } : { fontSize: "11px", ...styled }
      }
      width={width}
      align={align ? align : "left"}
      component={component}
      scope={scope}
    >
      {name}
    </TableCell>
  );
};

export default TableCellUse;
