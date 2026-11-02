import axios from "axios";
import { TOKEN_KEY } from "../constants/storage";
import { ROUTES } from "../constants/routes";

const UNAUTHORIZED = 401;

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Agrega el token JWT en cada request, si existe
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Si el token venció o es inválido, se limpia la sesión y se manda al login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = localStorage.getItem(TOKEN_KEY);
    if (error.response?.status === UNAUTHORIZED && hadToken) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default client;