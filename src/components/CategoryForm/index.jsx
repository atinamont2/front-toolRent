import { useState } from "react";

export const CategoryForm = ({ category, onSubmit, onCancel, saving }) => {
  const [form, setForm] = useState({
    name: category?.name || "",
    description: category?.description || "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (saving) return;
    if (!form.name.trim()) {
      setError("Ingresá un nombre para la categoría.");
      return;
    }
    setError(null);
    onSubmit({ name: form.name.trim(), description: form.description.trim() });
  };

  return (
    <form className="categories-form" onSubmit={handleSubmit} aria-busy={saving}>
      <h2>{category ? "Editar categoría" : "Nueva categoría"}</h2>
      {error && <p className="categories-error" role="alert">{error}</p>}
      <fieldset disabled={saving}>
        <label htmlFor="category-name">Nombre</label>
        <input id="category-name" name="name" value={form.name} onChange={handleChange} maxLength={255} required />
        <label htmlFor="category-description">Descripción (opcional)</label>
        <textarea id="category-description" name="description" value={form.description} onChange={handleChange} maxLength={255} rows={4} />
        <div className="categories-actions">
          <button type="submit" className="categories-primary">{saving ? "Guardando..." : "Guardar categoría"}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </fieldset>
    </form>
  );
};
