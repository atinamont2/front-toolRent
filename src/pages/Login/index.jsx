import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, getAuthError } from "../../api/auth";
import { AuthForm } from "../../components/AuthForm";
import { ROUTES } from "../../constants/routes";

export const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (request) => {
    setLoading(true);
    setError(null);
    try {
      const token = await login(request);
      onLogin(token);
      const destination = location.state?.from === ROUTES.HOME ? ROUTES.HOME : ROUTES.USERS;
      navigate(destination, { replace: true });
    } catch (error) {
      setError(getAuthError(error, "No se pudo iniciar sesión. Revisá el email y la contraseña."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <section className="auth-card">
        <h1>Iniciar sesión</h1>
        {location.state?.message && <p className="auth-success" role="status">{location.state.message}</p>}
        {error && <p className="auth-error" role="alert">{error}</p>}
        <AuthForm initialEmail={location.state?.email} onSubmit={handleLogin} loading={loading} />
        <p className="auth-switch">¿No tenés cuenta? <Link to={ROUTES.REGISTER}>Crear cuenta</Link></p>
      </section>
    </main>
  );
};
