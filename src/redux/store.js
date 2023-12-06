// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/features/empleadoSlice';
import obrasReducer from '../redux/features/obrasSlice'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    obras: obrasReducer,
  },
});

export default store;
