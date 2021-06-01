import React, { useEffect, useState } from "react";
import { createAPIEndPoint, ENDPOINTS } from "../../api";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  InputBase,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#000",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const SearchFoodItems = (props) => {
  const { values, setValues } = props;
  let orderedFoodItems = values.orderDetails;

  const [foodItems, setFoodItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const classes = useStyles();

  useEffect(() => {
    createAPIEndPoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((res) => setFoodItems(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addFoodItem = (foodItem) => {
    let x = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      foodItemPrice: foodItem.price,
      foodItemName: foodItem.foodItemName,
    };
    setValues({ ...values, orderDetails: [...values.orderDetails, x] });
  };

  useEffect(() => {
    let x = [...foodItems];
    x = x.filter((y) => {
      return (
        y.foodItemName.toLowerCase().includes(searchKey.toLowerCase()) &&
        orderedFoodItems.every((item) => item.foodItemId !== y.foodItemId)
      );
    });
    setSearchList(x);
  }, [searchKey, orderedFoodItems]);

  return (
    <React.Fragment>
      <Paper className={classes.searchPaper}>
        <InputBase
          className={classes.searchInput}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search food Items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </Paper>
      <List className={classes.listRoot}>
        {searchList.map((item, index) => {
          return (
            <ListItem key={index} onClick={() => addFoodItem(item)}>
              <ListItemText
                primary={item.foodItemName}
                secondary={"$" + item.price}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => addFoodItem(item)}>
                  <PlusOneIcon></PlusOneIcon>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default SearchFoodItems;
