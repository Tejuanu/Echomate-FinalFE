import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { closeSnack } from "src/redux/reducers/snack.reducer";

function AlertComponent() {
  const dispatch = useAppDispatch();
  const { open, type, message } = useAppSelector((state) => state.snack);
  const onClose = () => {
    dispatch(closeSnack());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert
        variant="filled"
        severity={type === "success" ? "success" : "error"}
        sx={{ width: "100%" }}
        onClose={onClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
