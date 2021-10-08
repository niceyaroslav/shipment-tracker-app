import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ShipmentService from '../ShipmentService'
import { v4 as uuidv4 } from 'uuid';

export const fetchShipments = createAsyncThunk('shipments/fetchShipments', async () => {
    const response = await ShipmentService.getAll()
    return response.data.map(obj=> ({ ...obj, id: uuidv4() }))
  });

export const shipmentsReducer = createSlice({
  name: 'shipments',
  initialState: {
    shipments: [],
    open: false,
    rowData: {}
  },
  reducers: {
    setShipments: (state, action) => {state.shipments = action.payload},
    setOpen: (state) => {state.open = true},
    setClose: (state) => {state.open = false},
    setRowData: (state, action) => {state.rowData = action.payload},
    deleteShipment: (state, action) => {state.shipments = state.shipments.filter(us => us.id !== action.payload)},
    updateRowData: (state) => {
        const shipmentIndex = state.shipments.findIndex(item => item.id === state.rowData.id);
        state.shipments[shipmentIndex] = state.rowData;
        state.open = false;
    }
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchShipments.fulfilled, (state, action) => {
      
      state.shipments = action.payload
    })
  }
})


export const shipments = {...shipmentsReducer.actions};
export default shipmentsReducer.reducer;