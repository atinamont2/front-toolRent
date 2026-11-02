export const CategoryList = ({ categories, onView, onEdit, onDelete, deletingId }) => {
  if (categories.length === 0) {
    return <p className="categories-status">No hay categorías registradas.</p>;
  }

  return (
    <ul className="categories-list">
      {categories.map((category) => (
        <li key={category.id} className="categories-card">
          <h2>{category.name}</h2>
          <p>{category.description || "Sin descripción."}</p>
          <div className="categories-actions">
            <button disabled={deletingId !== null} onClick={() => onView(category.id)}>Ver</button>
            <button disabled={deletingId !== null} onClick={() => onEdit(category.id)}>Editar</button>
            <button className="categories-danger" disabled={deletingId !== null} onClick={() => onDelete(category)}>
              {deletingId === category.id ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
