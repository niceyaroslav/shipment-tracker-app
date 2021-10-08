import { configureStore } from '@reduxjs/toolkit'
import shipmentsReducer from './shipmentsReducer';

const store = configureStore ({
  reducer: {
      shipments: shipmentsReducer
  }
})

export default store;