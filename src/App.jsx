import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { TOKEN_KEY } from "./constants/storage";
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { Users } from "./pages/Users";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const isAuthenticated = Boolean(token);

  const handleLogin = (newToken) => {
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
        <Route path={ROUTES.LOGIN} element={isAuthenticated ? <Navigate to={ROUTES.USERS} replace /> : <Login onLogin={handleLogin} />} />
        <Route path={ROUTES.REGISTER} element={isAuthenticated ? <Navigate to={ROUTES.USERS} replace /> : <Register />} />
        <Route path={ROUTES.HOME} element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
        <Route path={ROUTES.USERS} element={<ProtectedRoute isAuthenticated={isAuthenticated}><Users /></ProtectedRoute>} />
        <Route path={ROUTES.CATEGORIES} element={<ProtectedRoute isAuthenticated={isAuthenticated}><Categories /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
