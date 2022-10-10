import { Button } from "@material-ui/core";

/**
 *@function RButton.jsx
 *@author Azim
 *
 **/

const RButton = ({
  title,
  variant,
  color,
  size,
  wording,
  endIcon,
  fullWidth,
  startIcon,
  style,
  className,
  type
}) => {
  return (
    <Button
      title={title ? title : wording}
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      size={size ? size : "medium"}
      fullWidth={fullWidth ? fullWidth : ""}
      endIcon={endIcon ? endIcon : ""}
      startIcon={startIcon ? startIcon : ""}
      style={style}
      className={className ? className : null}
      type={type ? type : null}
    >
      {wording}
    </Button>
  );
};

export default RButton;
