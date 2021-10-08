import { makeStyles } from "@material-ui/core";
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React, { useEffect } from "react";
import Details from "./components/Details";
import Header from './components/Header';
import Table from './components/Table';
import { useDispatch } from 'react-redux'
import { fetchShipments, shipments } from "./store/shipmentsReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginTop: '1.2em',
    fontFamily: 'Noto Sans JP, sans-serif',
  }
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchShipments())
  }, [dispatch]);
 

  const showRowDataInModal = (data) => {
    dispatch(shipments.setOpen())
    dispatch(shipments.setRowData(data))
  }

  const columns = [
    {field: 'orderNo', headerName: 'ORDER NO', width: 150},
    {field: 'date', headerName: 'DATE', width: 120},
    {field: 'customer', headerName: 'CUSTOMER', width: 220},
    {field: 'trackingNo', headerName: 'TRACKING NO', width:250},
    {field: 'status', headerName: 'STATUS', width: 130},
    {field: 'consignee', headerName: 'CONSIGNEE', width: 180},
    {field: '  ', headerName: '', sortable: false, width: 85, disableColumnMenu: true, renderCell: (cellValues) => 
      <IconButton aria-label="delete" style={{color: "orange"}} onClick={() => setTimeout(() => dispatch(shipments.deleteShipment(cellValues.row.id)))}>
        <DeleteIcon />
      </IconButton>
    },
    {field: '', headerName: '', sortable: false, width: 80, disableColumnMenu: true, renderCell: (cellValues) => 
    <IconButton aria-label="details" color="primary" onClick={() => showRowDataInModal(cellValues.row)}>
      <ArticleIcon />
    </IconButton>}
  ];

  return (
    <>
      <Header classes={classes}/>
      <main>
        <Table columns={columns}/>
        <Details />
      </main>
    </>
  );
};
export default App;
