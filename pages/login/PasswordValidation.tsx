import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PasswordState } from "./LoginForm";

interface PasswordValidationProps {
  dirtyFields: any;
  passwordState: PasswordState;
}

export default function PasswordValidation({
  dirtyFields,
  passwordState,
}: PasswordValidationProps) {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 1,
        display: dirtyFields.password ? "block" : "none",
      }}
    >
      <Typography variant="subtitle1">Your password must contain:</Typography>
      <ul
        style={{
          marginLeft: 16,
        }}
      >
        <Typography
          variant="subtitle1"
          color={passwordState.lowercase ? "success.main" : "error.main"}
          component="li"
        >
          At least 1 lower case letter
        </Typography>
        <Typography
          variant="subtitle1"
          color={passwordState.uppercase ? "success.main" : "error.main"}
          component="li"
        >
          At least 1 upper case letter
        </Typography>
        <Typography
          variant="subtitle1"
          color={passwordState.number ? "success.main" : "error.main"}
          component="li"
        >
          At least 1 number
        </Typography>
        <Typography
          variant="subtitle1"
          color={passwordState.special ? "success.main" : "error.main"}
          component="li"
        >
          At least 1 special character
        </Typography>
        <Typography
          variant="subtitle1"
          color={passwordState.length ? "success.main" : "error.main"}
          component="li"
        >
          At least 8 characters
        </Typography>
      </ul>
    </Box>
  );
}
