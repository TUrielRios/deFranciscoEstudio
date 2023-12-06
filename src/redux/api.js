
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://estudio-backend-ti3p.vercel.app/', // Reemplaza esto con la URL de tu backend
});

export default api;
