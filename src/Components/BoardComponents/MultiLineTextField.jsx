import { TextField } from "@material-ui/core";

/**
 *@function MultiLineTextField.jsx
 *@author Azim
 *
 **/

const MultiLineTextField = ({ defaultValue, onChange, value }) => {
  return (
    <TextField
      size="large"
      fullWidth
      label="Acceptance Criteria *"
      variant="outlined"
      id="outlined-multiline-static"
      placeholder="given&#10;when&#10;Then"
      multiline
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      rows={3}
    />
  );
};

export default MultiLineTextField;
