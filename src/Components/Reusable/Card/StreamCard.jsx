/**
 *@function StreamCard.jsx
 *@author Azim
 *
 **/
import { Box } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

const StreamCard = (props) => {
  const {
    titleVariant,
    titleColor,
    titleText,
    description,
    isButton,
    buttonText,
    linkTo,
    linkData,
    children,
  } = props;

  return (
    <Box
      style={{
        padding: "20px 30px 83px 20px",
        margin: "0px 16px 0px 5px",
        height: "285px",
        backgroundColor: "#fff",
        boxShadow:
          "-9px 0px 9px -4px rgba(229, 229, 229, 0.7), 9px 9px 9px -4px rgba(229, 229, 229, 0.7)",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          style={{
            letterSpacing: "0.18px",
            fontSize: "24px",
            color: "#000",
            fontWeight: "bold",
          }}
          variant={titleVariant}
          color={titleColor}
        >
          {titleText}
        </Typography>
        <Link to={`/${linkTo}`}>
          <Typography>{linkData}</Typography>
        </Link>
      </Box>
      {description && (
        <Typography
          style={{
            margin: "30px 0px 70px 0px",
            fontSize: "13px",
          }}
          variant="body2"
        >
          {description}
        </Typography>
      )}

      {isButton && (
        <Button
          color="primary"
          style={{ textAlign: "center" }}
          startIcon={<AddCircle />}
          variant="outlined"
        >
          {buttonText}
        </Button>
      )}
      {children}
    </Box>
  );
};
export default StreamCard;
