import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { TOKEN_KEY } from "./constants/storage";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Orders } from "./pages/Orders";
import { ProductDetail } from "./pages/ProductDetail";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { isAdmin } from "./utils/authHelpers";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const isAuthenticated = Boolean(token);
  const userIsAdmin = isAuthenticated && isAdmin();

  const handleLogin = newToken => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.HOME} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.HOME} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PRODUCT_DETAIL}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDERS}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.USERS}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {userIsAdmin ? <Users /> : <Navigate to={ROUTES.HOME} replace />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
