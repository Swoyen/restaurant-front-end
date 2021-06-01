import {
  List,
  Paper,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  ButtonGroup,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { roundTo2DecimalPoint } from "../../utils";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    margin: "15px 0px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#E3E3E3",
    borderRadius: 8,
    "& .MuiButtonBase-root": {
      border: "none",
      minWidth: "25px",
      padding: "1px",
    },
    "& button:nth-child(2)": {
      fontSize: "1.2em",
      color: "#000",
    },
  },
  deleteButton: {
    display: "none",
    "& .MuiButtonBase-root": {
      color: "#E81719",
    },
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "1em",
  },
}));

const OrderedFoodItems = (props) => {
  const { values, setValues } = props;
  const classes = useStyles();
  let orderedFoodItems = values.orderDetails;

  const updateQuantity = (index, value) => {
    let x = { ...values };
    let foodItem = x.orderDetails[index];
    if (foodItem.quantity + value > 0) {
      foodItem.quantity += value;
      setValues({ ...x });
    }
  };

  const removeFoodItem = (index, id) => {
    let x = { ...values };
    x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
    if (id != 0) x.deletedOrderItemIds += id + ",";
    setValues({ ...x });
  };

  return (
    <List>
      {orderedFoodItems.length === 0 ? (
        <ListItem>
          <ListItemText
            primary="Please select food items"
            primaryTypographyProps={{
              style: { textAlign: "center", fontStyle: "italic" },
            }}
          />
        </ListItem>
      ) : (
        orderedFoodItems.map((item, index) => {
          return (
            <Paper key={index} className={classes.paperRoot}>
              <ListItem>
                <ListItemText
                  primary={item.foodItemName}
                  primaryTypographyProps={{
                    component: "h1",
                    style: {
                      fontWeight: "500",
                      fontSize: "1.2em",
                    },
                  }}
                  secondary={
                    <div>
                      <ButtonGroup
                        color="default"
                        aria-label=""
                        size="small"
                        className={classes.buttonGroup}
                      >
                        <Button onClick={() => updateQuantity(index, -1)}>
                          -
                        </Button>
                        <Button disabled>{item.quantity}</Button>
                        <Button onClick={() => updateQuantity(index, +1)}>
                          +
                        </Button>
                      </ButtonGroup>
                      <span className={classes.totalPerItem}>
                        {"$" +
                          roundTo2DecimalPoint(
                            item.quantity * item.foodItemPrice
                          )}
                      </span>
                    </div>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                />

                <ListItemSecondaryAction className={classes.deleteButton}>
                  <IconButton
                    aria-label=""
                    disableRipple
                    onClick={(e) => removeFoodItem(index, item.orderDetailId)}
                  >
                    <DeleteTwoToneIcon></DeleteTwoToneIcon>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          );
        })
      )}
    </List>
  );
};

export default OrderedFoodItems;
