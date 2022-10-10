import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
/**
 *@function MuiDatePicker.jsx
 *@author Azim
 *
 **/

const MuiDatePicker = ({
  keyboard,
  className,
  value,
  onChange,
  label,
  title,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {!keyboard ? (
        <DatePicker
          title={`Click to change date`}
          disableToolbar
          className={className}
          format="dd-MM-yyyy"
          placeholder={`Due date`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <KeyboardDatePicker
          className={className}
          title={title}
          disableToolbar
          format="dd-MM-yyyy"
          margin="normal"
          variant="outlined"
          id="date-picker-inline"
          label={label ? label : "Due date"}
          value={value}
          fullWidth
          onChange={onChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      )}
    </MuiPickersUtilsProvider>
  );
};

export default MuiDatePicker;
