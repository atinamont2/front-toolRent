import { useState } from "react";
import { createUser, updateUser, deleteUser } from "../../api/users";
import { getErrorMessage } from "../../api/errors";
import { useUsers } from "../../hooks/useUsers";
import { UserList } from "../../components/UserList";
import { UserDetail } from "../../components/UserDetail";
import { UserForm } from "../../components/UserForm";
import "./styles.css";

export const Users = () => {
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [message, setMessage] = useState(null);
  const { users, loading, error } = useUsers(refresh);

  const openView = (nextView, id = null) => {
    setView(nextView);
    setSelectedId(id);
    setActionError(null);
    setMessage(null);
  };

  const finishAction = (text) => {
    openView("list");
    setMessage(text);
    setRefresh((previous) => previous + 1);
  };

  const handleSave = async (request) => {
    setSaving(true);
    setActionError(null);
    try {
      if (view === "edit") {
        await updateUser(selectedId, request);
        finishAction("Usuario actualizado correctamente.");
      } else {
        await createUser(request);
        finishAction("Usuario creado correctamente.");
      }
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo guardar el usuario."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`¿Eliminar a ${user.name} ${user.lastName} (${user.email})? Esta acción no se puede deshacer.`)) return;
    setDeletingId(user.id);
    setActionError(null);
    setMessage(null);
    try {
      await deleteUser(user.id);
      finishAction("Usuario eliminado correctamente.");
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo eliminar el usuario."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="users-container">
      <header className="users-header">
        <h1>Usuarios</h1>
        {view === "list" && <button className="users-primary" onClick={() => openView("new")} disabled={deletingId !== null}>Nuevo usuario</button>}
      </header>
      {message && <p className="users-success" role="status">{message}</p>}
      {actionError && <p className="users-error" role="alert">{actionError}</p>}
      {view === "list" && (
        <>
          {loading && <p className="users-status" role="status">Cargando usuarios...</p>}
          {!loading && error && (
            <div className="users-error" role="alert">
              <p>{error}</p>
              <button onClick={() => setRefresh((previous) => previous + 1)}>Reintentar</button>
            </div>
          )}
          {!loading && !error && <UserList users={users} onView={(id) => openView("detail", id)} onEdit={(id) => openView("edit", id)} onDelete={handleDelete} deletingId={deletingId} />}
        </>
      )}
      {view === "new" && <UserForm onSubmit={handleSave} onCancel={() => openView("list")} saving={saving} />}
      {(view === "detail" || view === "edit") && (
        <UserDetail key={selectedId} id={selectedId} editing={view === "edit"} onEdit={(id) => openView("edit", id)} onBack={() => openView("list")} onSave={handleSave} onDelete={handleDelete} saving={saving} deletingId={deletingId} />
      )}
    </main>
  );
};
