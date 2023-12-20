import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchObras = createAsyncThunk('obras/fetchObras', async () => {
  const response = await fetch('https://estudio-backend-ti3p.vercel.app/obras');
  const data = await response.json();
  return data;
});

export const createObra = createAsyncThunk('obras/createObra', async (obraData) => {
  // Extraer las imágenes de la obraData
  const { imagenes, ...restOfData } = obraData;

  try {
    // Convertir imagenes a un array si no lo es
    const imagenesArray = Array.isArray(imagenes) ? imagenes : [imagenes];

    // Subir múltiples imágenes a Cloudinary
    const imageUrls = await Promise.all(
      imagenesArray.map(async (imagen) => {
        const formData = new FormData();
        formData.append('file', imagen);
        formData.append('upload_preset', 'ml_default');

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dhiss395i/image/upload',
          formData
        );

        return cloudinaryResponse.data.secure_url;
      })
    );

    // Agregar las URLs de las imágenes al resto de los datos
    const obraDataWithImageUrls = {
      ...restOfData,
      imagenes: imageUrls,
    };

    // Realizar la solicitud POST al backend con la nueva obraData
    const response = await fetch('https://estudio-backend-ti3p.vercel.app/obras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obraDataWithImageUrls),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Manejar errores según sea necesario
    throw error;
  }
});

export const updateObra = createAsyncThunk('obras/updateObra', async (obraData) => {
  const response = await fetch(`https://estudio-backend-ti3p.vercel.app/obras/${obraData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obraData),
  });
  const data = await response.json();
  return data;
});

export const deleteObra = createAsyncThunk('obras/deleteObra', async (obraId) => {
  await fetch(`https://estudio-backend-ti3p.vercel.app/obras/${obraId}`, {
    method: 'DELETE',
  });
  return obraId;
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
      })
      .addCase(createObra.fulfilled, (state, action) => {
        const { imagenes, ...restOfData } = action.payload;
        // Aquí, asegúrate de que la propiedad imagenes sea siempre un array
        const imagenesArray = Array.isArray(imagenes) ? imagenes : [imagenes];

        state.obras.push({
          ...restOfData,
          imagenes: imagenesArray,
        });
      })
      .addCase(updateObra.fulfilled, (state, action) => {
        const index = state.obras.findIndex((obra) => obra.id === action.payload.id);
        if (index !== -1) {
          state.obras[index] = action.payload;
        }
      })
      .addCase(deleteObra.fulfilled, (state, action) => {
        state.obras = state.obras.filter((obra) => obra.id !== action.payload);
      });
  },
});

export const selectObrasTerminadas = (state) => state.obras.obrasTerminadas;
export const selectObrasEnConstruccion = (state) => state.obras.obrasEnConstruccion;
export const selectLoading = (state) => state.obras.loading;

export default obrasSlice.reducer;
