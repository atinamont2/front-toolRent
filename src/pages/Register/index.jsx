import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, getAuthError } from "../../api/auth";
import { AuthForm } from "../../components/AuthForm";
import { ROUTES } from "../../constants/routes";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (request) => {
    setLoading(true);
    setError(null);
    try {
      const message = await register(request);
      navigate(ROUTES.LOGIN, { replace: true, state: { message, email: request.email } });
    } catch (error) {
      setError(getAuthError(error, "No se pudo registrar el usuario."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <section className="auth-card">
        <h1>Crear cuenta</h1>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <AuthForm isRegister onSubmit={handleRegister} loading={loading} />
        <p className="auth-switch">¿Ya tenés cuenta? <Link to={ROUTES.LOGIN}>Iniciar sesión</Link></p>
      </section>
    </main>
  );
};
