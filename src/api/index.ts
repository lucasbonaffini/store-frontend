import axios from 'axios';

// Usamos la API oficial
const API_BASE_URL = 'https://fakestoreapi.com'; 

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  // Reducimos el timeout para que falle rápido y podamos usar alternativas
  timeout: 5000
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    // Log adicional para ayudar con la depuración
    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de estado
      // que no está en el rango 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No response received:', error.request);
    } else {
      // Algo sucedió en la configuración de la solicitud que desencadenó un error
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);
