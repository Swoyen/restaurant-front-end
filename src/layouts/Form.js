import React from "react";
import { makeStyles } from "@material-ui/core";
import { DevicesOther } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "&. MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} noValidate autoComplete="off" {...other}>
      {props.children}
    </form>
  );
};

export default Form;
