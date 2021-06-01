import React from "react";
import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
    "& .MuiAlert-root": {
      backgroundColor: "#f3b33d",
      color: "#000",
    },
    "& .MuiAlert-icon": {
      color: "#000",
    },
  },
}));

const Notification = (props) => {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      className={classes.root}
      open={notify.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose}>{notify.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
