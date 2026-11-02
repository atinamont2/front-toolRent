import { useState } from "react";

export const UserForm = ({ user, onSubmit, onCancel, saving }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (saving) return;
    if (Object.values(form).some((value) => !value.trim())) {
      setError("Completá todos los campos. No pueden contener solamente espacios.");
      return;
    }
    setError(null);
    onSubmit({
      name: form.name.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <form className="users-form" onSubmit={handleSubmit} aria-busy={saving}>
      <h2>{user ? "Editar usuario" : "Nuevo usuario"}</h2>
      {error && <p className="users-error" role="alert">{error}</p>}
      <fieldset disabled={saving}>
        <label htmlFor="user-name">Nombre</label>
        <input id="user-name" name="name" value={form.name} onChange={handleChange} autoComplete="given-name" required />
        <label htmlFor="user-last-name">Apellido</label>
        <input id="user-last-name" name="lastName" value={form.lastName} onChange={handleChange} autoComplete="family-name" required />
        <label htmlFor="user-email">Email</label>
        <input id="user-email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required />
        <label htmlFor="user-password">Contraseña</label>
        <input id="user-password" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" aria-describedby={user ? "user-password-help" : undefined} required />
        {user && <p id="user-password-help">Ingresá la contraseña que deberá tener el usuario. Al guardar se reemplazará la anterior.</p>}
        <div className="users-actions">
          <button type="submit" className="users-primary">{saving ? "Guardando..." : "Guardar usuario"}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </fieldset>
    </form>
  );
};
