import { TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { createAPIEndPoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";
import DeleteOutLineTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

const OrderList = (props) => {
  const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } =
    props;
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    createAPIEndPoint(ENDPOINTS.ORDER)
      .fetchAll()
      .then((res) => setOrderList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderListVisibility(false);
  };

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure?")) {
      createAPIEndPoint(ENDPOINTS.ORDER)
        .delete(id)
        .then((res) => {
          setOrderListVisibility(false);
          setOrderId(0);
          resetFormControls();
          setNotify({ isOpen: true, message: "Delete successful." });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order No.</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Paid With</TableCell>
            <TableCell>Grand Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item) => (
            <TableRow key={item.orderMasterId}>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.orderNumber}
              </TableCell>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.customer.customerName}
              </TableCell>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.pMethod}
              </TableCell>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.gTotal}
              </TableCell>
              <TableCell>
                <DeleteOutLineTwoToneIcon
                  color="secondary"
                  onClick={() => deleteOrder(item.orderMasterId)}
                ></DeleteOutLineTwoToneIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
