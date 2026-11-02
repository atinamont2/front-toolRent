export const getErrorMessage = (error, fallback) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    return "Necesitás una sesión válida para administrar usuarios. Iniciá sesión nuevamente.";
  }
  if (!error.response) {
    return "No se pudo conectar con el servidor. Verificá que el backend esté disponible e intentá nuevamente.";
  }
  const data = error.response.data;
  if (typeof data === "string" && data.trim() && !data.includes("<html")) {
    return data;
  }
  return data?.message || fallback;
};
