import React, { useState, useEffect } from "react";
import Form from "../../layouts/Form";
import {
  Grid,
  InputAdornment,
  makeStyles,
  ButtonGroup,
  Button as MuiButton,
} from "@material-ui/core";
import { Input, Select, Button } from "../../controls";
import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";
import { createAPIEndPoint, ENDPOINTS } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from "../../layouts/Popup";
import OrderList from "../Order/OrderList";
import Notification from "../../layouts/Notification";

const pMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#f3b33d",
    color: "#000",
    marginTop: theme.spacing(2),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "#f3b33d:",
    },
  },
  grid: { flexGrow: 1 },
}));

const OrderForm = (props) => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const classes = useStyles();

  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });

  useEffect(() => {
    createAPIEndPoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        let customerList = res.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: "Select" }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice;
    }, 0);
    setValues({ ...values, gTotal: roundTo2DecimalPoint(gTotal) });
  }, [JSON.stringify(values.orderDetails)]);

  useEffect(() => {
    if (orderId === 0) resetFormControls();
    else {
      createAPIEndPoint(ENDPOINTS.ORDER)
        .fetchById(orderId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? "" : "This field is required.";
    temp.pMethod = values.pMethod !== "none" ? "" : "This field is required.";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "This field is required";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.orderMasterId === 0) {
        createAPIEndPoint(ENDPOINTS.ORDER)
          .create(values)
          .then((res) => {
            resetFormControls();
            setNotify({ isOpen: true, message: "New order is created" });
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndPoint(ENDPOINTS.ORDER)
          .update(values.orderMasterId, values)
          .then((res) => {
            setOrderId(0);
            setNotify({ isOpen: true, message: "The order is updated" });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const openListOfOrders = (e) => {
    setOrderListVisibility(true);
  };

  const resetForm = () => {
    setOrderId(0);
    resetFormControls();
  };

  return (
    <React.Fragment>
      <Form onSubmit={submitOrder}>
        <div className={classes.grid}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                disabled
                label="Order Number"
                name="orderNumber"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      className={classes.adornmentText}
                      position="start"
                    >
                      #
                    </InputAdornment>
                  ),
                }}
                value={values.orderNumber || ""}
              ></Input>
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Customer"
                name="customerId"
                value={values.customerId === 0? "" : values.customerId}
                onChange={(e) => handleInputChange(e)}
                options={customerList}
                error={errors.customerId}
              ></Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Payment Method"
                name="pMethod"
                options={pMethods}
                value={values.pMethod}
                onChange={handleInputChange}
                error={errors.pMethod}
              ></Select>
            </Grid>
            <Grid item xs={6}>
              <Input
                disabled
                label="Grand Total"
                name="gTotal"
                value={values.gTotal}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      className={classes.adornmentText}
                      position="start"
                    >
                      $
                    </InputAdornment>
                  ),
                }}
              ></Input>

              <ButtonGroup className={classes.submitButtonGroup}>
                <MuiButton
                  size="large"
                  type="submit"
                  endIcon={<RestaurantMenuIcon />}
                >
                  Submit
                </MuiButton>
                <MuiButton
                  size="small"
                  onClick={(e) => resetForm()}
                  startIcon={<ReplayIcon />}
                />
              </ButtonGroup>

              <Button
                onClick={(e) => openListOfOrders()}
                size="large"
                startIcon={<ReorderIcon />}
              >
                Orders
              </Button>
            </Grid>
          </Grid>
        </div>
      </Form>
      <Popup
        title="List of Orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
      >
        <OrderList
          {...{
            setOrderId,
            setOrderListVisibility,
            resetFormControls,
            setNotify,
          }}
        />
      </Popup>
      <Notification {...{ notify, setNotify }}></Notification>
    </React.Fragment>
  );
};

export default OrderForm;
