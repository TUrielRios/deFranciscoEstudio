// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/features/empleadoSlice';
import obrasReducer from '../redux/features/obrasSlice'
import muralesReducer from './features/muralesSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    obras: obrasReducer,
    murales: muralesReducer
  },
});

export default store;
