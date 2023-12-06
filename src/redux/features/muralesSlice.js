import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMurales = createAsyncThunk('obras/fetchMurales', async () => {
  const response = await fetch('https://estudio-backend-ti3p.vercel.app/muralismos');
  const data = await response.json();
  return data;
});
export const selectMuralesCargados = (state) => state.murales.muralesCargados;

const muralesSlice = createSlice({
  name: 'murales',
  initialState: {
    murales: [],
    loading: false,
    error: null,
    muralesCargados: false, // Nueva propiedad para verificar si las obras han sido cargadas
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMurales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMurales.fulfilled, (state, action) => {
        state.murales = action.payload;
        state.loading = false;
        state.muralesCargados = true; // Marcar que las obras han sido cargadas
      })
      .addCase(fetchMurales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectLoading = (state) => state.murales.loading;

export default muralesSlice.reducer;
