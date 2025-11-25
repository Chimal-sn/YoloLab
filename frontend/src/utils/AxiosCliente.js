// src/utils/axiosClient.js

import axios from "axios";

// 1. Crear instancia de axios con configuración base
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 2. Interceptor que agrega el token automáticamente
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 3. Interceptor para manejar errores globalmente
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    }

    return Promise.reject({
      status: 500,
      data: { error: "Error de conexión con el servidor" },
    });
  }
);

export default axiosClient;
