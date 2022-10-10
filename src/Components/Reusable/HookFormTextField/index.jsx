import { TextField } from "@material-ui/core";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessages } from "Components/Reusable";
/**
 *@function HookFormTextField.jsx
 *@author Azim
 *
 **/
const HookFormTextField = ({
  control,
  defaultValue,
  label,
  name,
  style,
  className,
  rules,
  size,
  variant,
  type,
  errors,
  InputProps,
}) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ""}
        rules={
          rules
            ? rules
            : {
                required: {
                  value: true,
                  message: "This is required",
                },
              }
        }
        render={({ field }) => (
          <TextField
            {...field}
            size={size ? size : "medium"}
            fullWidth={type === "checkbox" ? false : true}
            style={style}
            autoComplete={type === "password" ? "true" : "false"}
            className={className}
            label={label}
            variant={variant ? variant : "outlined"}
            type={type ? type : "text"}
            InputProps={InputProps}
          />
        )}
      />
      {errors && <ErrorMessages errors={errors} name={name} />}
    </Fragment>
  );
};

export default HookFormTextField;
