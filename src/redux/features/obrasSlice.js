import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchObras = createAsyncThunk('obras/fetchObras', async () => {
  const response = await fetch('https://estudio-backend-ti3p.vercel.app/obras');
  const data = await response.json();
  return data;
});
export const selectObrasCargadas = (state) => state.obras.obrasCargadas;

const obrasSlice = createSlice({
  name: 'obras',
  initialState: {
    obras: [],
    obrasTerminadas: [],
    obrasEnConstruccion: [],
    loading: false,
    error: null,
    obrasCargadas: false, // Nueva propiedad para verificar si las obras han sido cargadas
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObras.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObras.fulfilled, (state, action) => {
        state.obras = action.payload;
        state.obrasTerminadas = action.payload.filter((obra) => obra.estado === 'Terminado');
        state.obrasEnConstruccion = action.payload.filter((obra) => obra.estado === 'En Construcción');
        state.loading = false;
        state.obrasCargadas = true; // Marcar que las obras han sido cargadas
      })
      .addCase(fetchObras.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectObrasTerminadas = (state) => state.obras.obrasTerminadas;
export const selectObrasEnConstruccion = (state) => state.obras.obrasEnConstruccion;
export const selectLoading = (state) => state.obras.loading;

export default obrasSlice.reducer;
