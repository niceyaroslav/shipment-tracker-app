import React from "react";
import { Button } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { shipments } from "../store/shipmentsReducer";

const Details = () => {
  const dispatch = useDispatch();
  const rowData = useSelector(state => state.shipments.rowData)
  const open = useSelector(state => state.shipments.open)
    const format = (d) => {
      let newDate = Date.parse(d)
      let date = new Date(newDate);
      let day = ('0' + date.getDate()).slice(-2);
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    const formData = [
        {label: 'Order No', key: "orderNo", value: rowData.orderNo, type: 'text'},
        {label: 'Date',  key: "date", value: format(rowData.date), type: 'date'},
        {label: 'Customer',  key: "customer", value: rowData.customer, type: 'text'},
        {label: 'Tracking No',  key: "trackingNo", value: rowData.trackingNo, type: 'text'},
        {label: 'Status',  key: "status", value: rowData.status, type: 'text'},
        {label: 'Consignee',  key: "consignee", value: rowData.consignee, type: 'text'},
    ]
    
    return (
        <Dialog open={open} onClose={() => dispatch(shipments.setClose())}>
        <DialogTitle>Shipment details</DialogTitle>
        <DialogContent>
            {formData
            .map((field) => {
              if (field.label === "Date") {
                const modify = (d) => {
                  let dateList = d.split('-')
                  return [dateList[1], dateList[2], dateList[0]].join('/')
                }
                return (<TextField
                  key={field.key}
                  margin="dense"
                  type={field.type}
                  label={field.label}
                  style={{width: "45%", margin: "2%"}}
                  variant="standard"
                  defaultValue={field.value}
                  onChange={(event) => dispatch(shipments.setRowData({...rowData, [field.key]: modify(event.target.value)}))} 
                />)
              } else {
                return (<TextField
                key={field.key}
                margin="dense"
                type={field.type}
                label={field.label}
                style={{width: "45%", margin: "2%"}}
                variant="standard"
                defaultValue={field.value}
                onChange={(event) => dispatch(shipments.setRowData({...rowData, [field.key]: event.target.value}))} 
              />)
              }
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(shipments.setClose())}>Cancel</Button>
          <Button onClick={() => dispatch(shipments.updateRowData())}>Save</Button>
        </DialogActions>
      </Dialog>
    )
};

export default Details;