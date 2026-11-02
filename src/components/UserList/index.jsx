export const UserList = ({ users, onView, onEdit, onDelete, deletingId }) => {
  if (users.length === 0) {
    return <p className="users-status">No hay usuarios registrados.</p>;
  }

  return (
    <ul className="users-list">
      {users.map((user) => (
        <li key={user.id} className="users-card">
          <h2>{user.name} {user.lastName}</h2>
          <p>{user.email}</p>
          <div className="users-actions">
            <button disabled={deletingId !== null} onClick={() => onView(user.id)}>Ver</button>
            <button disabled={deletingId !== null} onClick={() => onEdit(user.id)}>Editar</button>
            <button className="users-danger" disabled={deletingId !== null} onClick={() => onDelete(user)}>
              {deletingId === user.id ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
