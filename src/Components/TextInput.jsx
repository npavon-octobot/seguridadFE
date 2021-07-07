import React from "react";
import { TextField } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const TextInput = (props) => {
  const {
    id,
    onChange,
    label,
    name,
    autoFocus = false,
    error = false,
    errorMessage,
    type = "text",
  } = props;

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px #6b9cd1 inset",
            "-webkit-text-fill-color": "#000",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={id}
        type={type}
        onChange={(text) => onChange(text)}
        label={label}
        name={name}
        autoFocus={autoFocus}
        error={error}
        helperText={error ? errorMessage : ""}
      />
    </ThemeProvider>
  );
};

export default TextInput;
