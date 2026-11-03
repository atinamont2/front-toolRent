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
  if (!user) return false;

  const roles = user.roles || user.role || user.authorities;
  if (!roles) return false;

  if (Array.isArray(roles)) {
    return roles.some((r) => {
      const val = typeof r === "object" ? r.authority : r;
      return val === "ROLE_ADMIN" || val === "ADMIN";
    });
  }

  if (typeof roles === "string") {
    return roles === "ROLE_ADMIN" || roles === "ADMIN";
  }

  return false;
};