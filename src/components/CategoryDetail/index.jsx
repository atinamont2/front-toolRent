import { useCategory } from "../../hooks/useCategory";
import { CategoryForm } from "../CategoryForm";

export const CategoryDetail = ({ id, editing, onEdit, onBack, onSave, onDelete, saving, deletingId }) => {
  const { category, loading, error } = useCategory(id);

  if (loading) return <p className="categories-status" role="status">Cargando categoría...</p>;
  if (error) {
    return (
      <section>
        <p className="categories-error" role="alert">{error}</p>
        <button onClick={onBack}>Volver a categorías</button>
      </section>
    );
  }
  if (editing) {
    return <CategoryForm category={category} onSubmit={onSave} onCancel={onBack} saving={saving} />;
  }

  return (
    <section className="categories-card">
      <h2>Detalle de categoría</h2>
      <dl className="categories-details">
        <dt>ID</dt><dd>{category.id}</dd>
        <dt>Nombre</dt><dd>{category.name}</dd>
        <dt>Descripción</dt><dd>{category.description || "Sin descripción."}</dd>
      </dl>
      <div className="categories-actions">
        <button onClick={() => onEdit(id)} disabled={deletingId !== null}>Editar</button>
        <button className="categories-danger" onClick={() => onDelete(category)} disabled={deletingId !== null}>
          {deletingId !== null ? "Eliminando..." : "Eliminar"}
        </button>
        <button onClick={onBack} disabled={deletingId !== null}>Volver a categorías</button>
      </div>
    </section>
  );
};
