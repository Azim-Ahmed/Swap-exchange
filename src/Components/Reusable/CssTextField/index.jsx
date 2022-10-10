import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      margin: "8px 0px",
      maxWidth: "457px",
    },
    "& .MuiOutlinedInput-input": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiSvgIcon-root": {
      color: "gray",
    },
    "& label.Mui-focused": {
      color: "rgba(98, 0, 238, 1)",
    },
    "& .MuiFormLabel-root": {
      color: "gray",
      // margin to make lebel text align with border
      marginTop: "8px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gray",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "gray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(98, 0, 238, 1)",
      },
    },
  },
})(TextField);

export default CssTextField;
