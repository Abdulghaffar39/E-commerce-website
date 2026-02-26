import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const AnimatedTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#2c5364",
    fontWeight: "bold",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#2c5364",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#203a43",
    },
    "&:hover fieldset": {
      borderColor: "#2c5364",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2c5364",
      borderWidth: 2,
    },
  },
});

const FormInput = ({ label, type = "text", value, onChange, name }) => {
  return (
    <AnimatedTextField
      label={label}
      type={type}
      name={name}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;