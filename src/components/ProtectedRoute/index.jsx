import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }

  return children;
};
