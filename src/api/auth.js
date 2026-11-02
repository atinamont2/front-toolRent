import client from "./client";

const AUTH_PATH = "/api/auth";

export const login = async (request) => {
  const { data } = await client.post(`${AUTH_PATH}/login`, request);
  return data;
};

export const register = async (request) => {
  const { data } = await client.post(`${AUTH_PATH}/register`, request);
  return data;
};

export const getAuthError = (error, fallback) => {
  if (!error.response) {
    return "No se pudo conectar con el servidor. Intentá nuevamente.";
  }
  if (typeof error.response.data === "string" && error.response.data.trim()) {
    return error.response.data;
  }
  return error.response.data?.message || fallback;
};
