import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core";
/**
 *@function ErrorMessages.jsx
 *@author Azim
 *
 **/

const ErrorMessages = ({ errors, name, style, errorMargin }) => {
  const useStyles = makeStyles(() => ({
    errorStyle: {
      margin: errorMargin ? errorMargin : "0",
      color: "red",
    },
  }));
  const classes = useStyles();
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <span style={style} className={classes.errorStyle}>
          {message}
        </span>
      )}
    />
  );
};

export default ErrorMessages;
