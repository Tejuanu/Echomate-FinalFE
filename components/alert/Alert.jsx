import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertComp({ showAlert, setShowAlert }) {
  const { open, message, messageType } = showAlert;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert({
      open: false,
      message: "message",
      messageType: messageType,
    });
  };

  // function slideTransition(props) {
  //   return <Slide {...props} direction="right" />;
  // }
  return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        // TransitionComponent={slideTransition}
      >
        {messageType && message ? (
          <Alert
            onClose={handleClose}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        ) : (
          <></>
        )}
      </Snackbar>
  );
}
