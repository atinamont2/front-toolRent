import { useUser } from "../../hooks/useUser";
import { UserForm } from "../UserForm";

export const UserDetail = ({ id, editing, onEdit, onBack, onSave, onDelete, saving, deletingId }) => {
  const { user, loading, error } = useUser(id);

  if (loading) return <p className="users-status" role="status">Cargando usuario...</p>;
  if (error) {
    return (
      <section>
        <p className="users-error" role="alert">{error}</p>
        <button onClick={onBack}>Volver a usuarios</button>
      </section>
    );
  }
  if (editing) {
    return <UserForm user={user} onSubmit={onSave} onCancel={onBack} saving={saving} />;
  }

  return (
    <section className="users-card">
      <h2>Detalle del usuario</h2>
      <dl className="users-details">
        <dt>ID</dt><dd>{user.id}</dd>
        <dt>Nombre</dt><dd>{user.name}</dd>
        <dt>Apellido</dt><dd>{user.lastName}</dd>
        <dt>Email</dt><dd>{user.email}</dd>
      </dl>
      <div className="users-actions">
        <button onClick={() => onEdit(id)} disabled={deletingId !== null}>Editar</button>
        <button className="users-danger" onClick={() => onDelete(user)} disabled={deletingId !== null}>
          {deletingId !== null ? "Eliminando..." : "Eliminar"}
        </button>
        <button onClick={onBack} disabled={deletingId !== null}>Volver a usuarios</button>
      </div>
    </section>
  );
};
