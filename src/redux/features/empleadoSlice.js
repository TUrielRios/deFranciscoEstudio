// frontend/redux/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmployeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (state, action) => {
      state.employees = action.payload;
      state.loading = false;
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createEmployeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.loading = false;
    },
    createEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmployeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeSuccess: (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex((employee) => employee.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
      state.loading = false;
    },
    updateEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEmployeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteEmployeeSuccess: (state, action) => {
      const deletedEmployeeId = action.payload;
      state.employees = state.employees.filter((employee) => employee.id !== deletedEmployeeId);
      state.loading = false;
    },
    deleteEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  createEmployeeStart,
  createEmployeeSuccess,
  createEmployeeFailure,
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
} = employeeSlice.actions;

// Async Thunks for API calls
export const fetchEmployees = () => async (dispatch) => {
  dispatch(fetchEmployeesStart());
  try {
    const response = await axios.get('https://estudio-backend-ti3p.vercel.app/empleados');
    dispatch(fetchEmployeesSuccess(response.data));
  } catch (error) {
    dispatch(fetchEmployeesFailure(error.message));
  }
};

export const createEmployee = (employeeData) => async (dispatch) => {
  dispatch(createEmployeeStart());
  try {
    const response = await axios.post('https://estudio-backend-ti3p.vercel.app/empleados', employeeData);
    dispatch(createEmployeeSuccess(response.data));
  } catch (error) {
    dispatch(createEmployeeFailure(error.message));
  }
};

export const updateEmployee = createAsyncThunk('empleados/updateEmployee', async (employeeData) => {
  const response = await fetch(`https://estudio-backend-ti3p.vercel.app/empleados/${employeeData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  const data = await response.json();
  return data;
});


export const deleteEmployee = (employeeId) => async (dispatch) => {
  dispatch(deleteEmployeeStart());
  try {
    await axios.delete(`https://estudio-backend-ti3p.vercel.app/empleados/${employeeId}`);
    dispatch(deleteEmployeeSuccess(employeeId));
  } catch (error) {
    dispatch(deleteEmployeeFailure(error.message));
  }
};

export default employeeSlice.reducer;
