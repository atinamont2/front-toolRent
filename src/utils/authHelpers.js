import { TOKEN_KEY } from "../constants/storage";

export const getUserFromToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = atob(payloadBase64);
    return JSON.parse(decodedJson);
  } catch {
    return null;
  }
};

export const isAdmin = () => {
  const user = getUserFromToken();
  if (!user || !user.roles) return false;
  return user.roles.includes("ROLE_ADMIN");
};