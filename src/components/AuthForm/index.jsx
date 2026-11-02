import { useState } from "react";
import "./styles.css";

export const AuthForm = ({ isRegister = false, initialEmail = "", onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "", lastName: "", email: initialEmail, password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;
    const request = { email: form.email.trim(), password: form.password };
    if (isRegister) {
      request.name = form.name.trim();
      request.lastName = form.lastName.trim();
    }
    if (Object.values(request).some((value) => !value.trim())) {
      setError("Completá todos los campos. No pueden contener solamente espacios.");
      return;
    }
    setError(null);
    onSubmit(request);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} aria-busy={loading}>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <fieldset disabled={loading}>
        {isRegister && (
          <>
            <label htmlFor="auth-name">Nombre</label>
            <input id="auth-name" name="name" autoComplete="given-name" value={form.name} onChange={handleChange} required />
            <label htmlFor="auth-last-name">Apellido</label>
            <input id="auth-last-name" name="lastName" autoComplete="family-name" value={form.lastName} onChange={handleChange} required />
          </>
        )}
        <label htmlFor="auth-email">Email</label>
        <input id="auth-email" name="email" type="email" autoComplete="username" value={form.email} onChange={handleChange} required />
        <label htmlFor="auth-password">Contraseña</label>
        <input id="auth-password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} value={form.password} onChange={handleChange} required />
        <button type="submit">
          {loading ? (isRegister ? "Registrando..." : "Ingresando...") : (isRegister ? "Registrarme" : "Ingresar")}
        </button>
      </fieldset>
    </form>
  );
};
