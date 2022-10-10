import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Controller } from "react-hook-form";
/**
 *@function AutoComplete.jsx
 *@author Azim
 *
 **/
const AutoComplete = ({
  options,
  defaultValue,
  onChange,
  control,
  label,
  getOptionLabel,
  renderOption,
}) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionSelected={(option, value) => {
            return option.value === value.value;
          }}
          renderOption={renderOption}
          defaultValue={defaultValue}
          getOptionLabel={getOptionLabel}
          style={{ width: "100%", padding: "20px" }}
          onChange={onChange}
          id="blur-on-select"
          blurOnSelect
          fullWidth={false}
          renderInput={(params) => (
            <TextField {...params} fullWidth label={label} variant="outlined" />
          )}
        />
      )}
    />
  );
};

export default AutoComplete;
